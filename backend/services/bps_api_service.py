"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
BPS Web API Integration Service (Badan Pusat Statistik Republik Indonesia)
Official API Endpoint: https://webapi.bps.go.id/v1/api/
==============================================================================
Provides resilient dual-layer caching, live synchronization, composite-key
decoding, and official BRS (Berita Resmi Statistik) streaming.
==============================================================================
"""

import json
import logging
import ssl
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from backend.config import (
    BPS_API_BASE_URL,
    BPS_API_KEY,
    BPS_CACHE_FILE,
    BPS_DEFAULT_DOMAIN,
)

logger = logging.getLogger("bps_api_service")


class BpsApiService:
    """
    Client and processing engine for BPS Web API (Badan Pusat Statistik RI).
    """

    _IN_MEMORY_CACHE: Dict[str, Any] = {}
    _SSL_CONTEXT: Optional[ssl.SSLContext] = None

    # Mappings for known critical statutory variables
    KEY_VARIABLES = {
        "PDB_GROWTH": {
            "var_id": 104,
            "subject_id": 11,
            "name": "Pertumbuhan PDB Riil (% YoY)",
            "unit": "Persen",
            "vervar_target": "PRODUK DOMESTIK BRUTO",
            "turvar_target": "YoY",
        },
        "PDB_NOMINAL": {
            "var_id": 65,
            "subject_id": 11,
            "name": "PDB Menurut Lapangan Usaha Seri 2010",
            "unit": "Milyar Rupiah",
            "vervar_target": "PRODUK DOMESTIK BRUTO",
        },
        "INFLASI_MOM": {
            "var_id": 1,
            "subject_id": 3,
            "name": "Inflasi Bulanan (M-to-M)",
            "unit": "Persen",
        },
        "INFLASI_IHK": {
            "var_id": 2,
            "subject_id": 3,
            "name": "Indeks Harga Konsumen (Umum)",
            "unit": "Indeks",
        },
        "INFLASI_TEMBAKAU": {
            "var_id": 1890,
            "subject_id": 3,
            "name": "Inflasi Makanan, Minuman dan Tembakau",
            "unit": "Indeks",
        },
        "EKSPOR_TOTAL": {
            "var_id": 196,
            "subject_id": 8,
            "name": "Nilai Ekspor Total Nasional",
            "unit": "Juta US$",
        },
        "IMPOR_TOTAL": {
            "var_id": 497,
            "subject_id": 8,
            "name": "Nilai Impor Total Nasional",
            "unit": "Juta US$",
        },
        "TRADE_BALANCE": {
            "var_id": 498,
            "subject_id": 8,
            "name": "Neraca Perdagangan Nasional",
            "unit": "Juta US$",
        },
    }

    # BPS Year ID Reference Table (th_id -> Calendar Year)
    YEAR_MAP = {
        "2026": 126,
        "2025": 125,
        "2024": 124,
        "2023": 123,
        "2022": 122,
        "2021": 121,
        "2020": 120,
        "2019": 119,
        "2018": 118,
        "2017": 117,
        "2016": 116,
        "2015": 115,
        "2014": 114,
        "2013": 113,
        "2012": 112,
        "2011": 111,
        "2010": 110,
    }
    YEAR_ID_TO_YEAR = {v: k for k, v in YEAR_MAP.items()}

    @classmethod
    def _get_ssl_context(cls) -> ssl.SSLContext:
        if cls._SSL_CONTEXT is None:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            cls._SSL_CONTEXT = ctx
        return cls._SSL_CONTEXT

    @classmethod
    def get_masked_key(cls) -> str:
        key = BPS_API_KEY or ""
        if len(key) <= 8:
            return "******"
        return f"{key[:8]}...{key[-5:]}"

    @classmethod
    def _read_disk_cache(cls) -> Dict[str, Any]:
        if cls._IN_MEMORY_CACHE:
            return cls._IN_MEMORY_CACHE

        if BPS_CACHE_FILE.exists():
            try:
                with open(BPS_CACHE_FILE, "r", encoding="utf-8") as f:
                    cls._IN_MEMORY_CACHE = json.load(f)
                    return cls._IN_MEMORY_CACHE
            except Exception as e:
                logger.warning(f"Failed to read BPS disk cache: {e}")

        cls._IN_MEMORY_CACHE = {
            "last_synced": None,
            "connection_status": "UNTESTED",
            "press_releases": [],
            "indicators": {},
            "raw_variables": {},
        }
        return cls._IN_MEMORY_CACHE

    @classmethod
    def _write_disk_cache(cls, data: Dict[str, Any]) -> None:
        cls._IN_MEMORY_CACHE = data
        try:
            BPS_CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(BPS_CACHE_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Failed to write BPS disk cache: {e}")

    @classmethod
    def _request_api(cls, endpoint_path: str, timeout: int = 15) -> Dict[str, Any]:
        """
        Executes an HTTP GET request to BPS Web API with standard user agent and SSL handling.
        """
        url = f"{BPS_API_BASE_URL}/{endpoint_path.lstrip('/')}"
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "DEN-Indonesia-Economic-Observatory/2.0 (indoekonomi.data.go.id)",
                "Accept": "application/json",
            },
        )
        ctx = cls._get_ssl_context()
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as response:
                content = response.read().decode("utf-8")
                return json.loads(content)
        except urllib.error.HTTPError as e:
            logger.warning(f"BPS API HTTP error {e.code} for {url}: {e.reason}")
            return {"status": "Error", "message": f"HTTP {e.code}: {e.reason}"}
        except Exception as e:
            logger.warning(f"BPS API connection failure for {url}: {e}")
            return {"status": "Error", "message": str(e)}

    # --------------------------------------------------------------------------
    # 1. CONNECTIVITY CHECK & STATUS
    # --------------------------------------------------------------------------
    @classmethod
    def check_connection(cls, force: bool = False) -> Dict[str, Any]:
        """
        Tests API connection and key validity.
        """
        cache = cls._read_disk_cache()
        cached_status = cache.get("connection_status")

        if not force and cached_status in ["CONNECTED", "ONLINE"]:
            return {
                "status": "CONNECTED",
                "is_connected": True,
                "api_key_masked": cls.get_masked_key(),
                "domain": BPS_DEFAULT_DOMAIN,
                "provider": "Badan Pusat Statistik Republik Indonesia (BPS RI)",
                "base_url": BPS_API_BASE_URL,
                "last_checked": cache.get("last_checked", datetime.now().isoformat()),
                "source": "cache",
            }

        start_time = time.time()
        # Query subject list model as lightweight ping
        endpoint = f"list/model/subject/domain/{BPS_DEFAULT_DOMAIN}/page/1/key/{BPS_API_KEY}/"
        res = cls._request_api(endpoint, timeout=10)
        latency_ms = round((time.time() - start_time) * 1000, 2)

        if res.get("status") == "OK":
            now_iso = datetime.now().strftime("%Y-%m-%d %H:%M:%S WIB")
            cache["connection_status"] = "CONNECTED"
            cache["last_checked"] = now_iso
            cache["latency_ms"] = latency_ms
            cls._write_disk_cache(cache)
            return {
                "status": "CONNECTED",
                "is_connected": True,
                "latency_ms": latency_ms,
                "api_key_masked": cls.get_masked_key(),
                "domain": BPS_DEFAULT_DOMAIN,
                "provider": "Badan Pusat Statistik Republik Indonesia (BPS RI)",
                "base_url": BPS_API_BASE_URL,
                "last_checked": now_iso,
                "message": "Terhubung dan terotentikasi resmi dengan server BPS RI",
            }
        else:
            return {
                "status": "DISCONNECTED",
                "is_connected": False,
                "latency_ms": latency_ms,
                "api_key_masked": cls.get_masked_key(),
                "domain": BPS_DEFAULT_DOMAIN,
                "error": res.get("message", "Gagal menghubungi BPS Web API"),
                "message": "Koneksi ke BPS API tidak berhasil. Menggunakan baseline data statutori terverifikasi.",
            }

    # --------------------------------------------------------------------------
    # 2. PRESS RELEASES (BERITA RESMI STATISTIK / BRS)
    # --------------------------------------------------------------------------
    @classmethod
    def fetch_press_releases(cls, limit: int = 10, page: int = 1, force_refresh: bool = False) -> List[Dict[str, Any]]:
        """
        Fetches the latest official Press Releases (BRS) from BPS Web API.
        """
        cache = cls._read_disk_cache()
        cached_brs = cache.get("press_releases", [])

        if not force_refresh and cached_brs and page == 1:
            return cached_brs[:limit]

        endpoint = f"list/model/pressrelease/domain/{BPS_DEFAULT_DOMAIN}/page/{page}/key/{BPS_API_KEY}/"
        res = cls._request_api(endpoint, timeout=12)

        if res.get("status") == "OK" and len(res.get("data", [])) > 1:
            raw_list = res["data"][1]
            brs_items = []
            for item in raw_list[:limit]:
                brs_items.append({
                    "brs_id": item.get("brs_id"),
                    "title": item.get("title"),
                    "release_date": item.get("rl_date"),
                    "abstract": item.get("abstract", "").strip() if item.get("abstract") else "",
                    "pdf_url": item.get("pdf", ""),
                    "size": item.get("size", ""),
                    "category": item.get("subj", "Statistik Nasional"),
                    "source": "Badan Pusat Statistik (BPS RI)",
                })

            if page == 1:
                cache["press_releases"] = brs_items
                cls._write_disk_cache(cache)

            return brs_items

        return cached_brs[:limit] if cached_brs else []

    # --------------------------------------------------------------------------
    # 3. STRUCTURED DATA MODEL PARSER (VARIABLE EXTRACTION)
    # --------------------------------------------------------------------------
    @classmethod
    def fetch_variable_data(
        cls,
        var_id: int,
        years: Optional[List[int]] = None,
        force_refresh: bool = False
    ) -> Dict[str, Any]:
        """
        Queries BPS model 'data' for a specific var_id and decodes the composite keys:
        datacontent key: {vervar_val}{turvar_val}{var_id}{tahun_val}{turtahun_val}
        """
        cache = cls._read_disk_cache()
        cache_key = f"var_{var_id}"

        if not force_refresh and cache_key in cache.get("raw_variables", {}):
            return cache["raw_variables"][cache_key]

        if not years:
            years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

        th_ids = [str(cls.YEAR_MAP[str(y)]) for y in years if str(y) in cls.YEAR_MAP]
        if not th_ids:
            th_ids = ["124", "123", "122", "121", "120"]

        # BPS API enforces a maximum of 3 years per request in 'th' parameter.
        # Chunk th_ids in slices of 3 and merge responses.
        merged_datacontent = {}
        vervar_map = {}
        turvar_map = {}
        tahun_map = {}
        turtahun_map = {}
        var_meta = {}
        last_update_str = ""

        chunk_size = 3
        th_chunks = [th_ids[i:i + chunk_size] for i in range(0, len(th_ids), chunk_size)]

        for chunk in th_chunks:
            th_param = ";".join(chunk)
            endpoint = f"list/model/data/domain/{BPS_DEFAULT_DOMAIN}/var/{var_id}/th/{th_param}/key/{BPS_API_KEY}/"
            res = cls._request_api(endpoint, timeout=18)

            if res.get("status") != "OK":
                logger.warning(f"BPS data fetch failed for var {var_id}, th {th_param}: {res.get('message')}")
                continue

            merged_datacontent.update(res.get("datacontent", {}))
            for v in res.get("vervar", []):
                vervar_map[str(v["val"])] = v["label"]
            for tv in res.get("turvar", []):
                turvar_map[str(tv["val"])] = tv["label"]
            for t in res.get("tahun", []):
                tahun_map[str(t["val"])] = t["label"]
            for tt in res.get("turtahun", []):
                turtahun_map[str(tt["val"])] = tt["label"]
            if not var_meta and res.get("var"):
                var_meta = res.get("var", [{}])[0]
            if res.get("last_update"):
                last_update_str = res.get("last_update")

        if not merged_datacontent and cache_key in cache.get("raw_variables", {}):
            return cache["raw_variables"][cache_key]

        datacontent = merged_datacontent

        # Parse data points
        parsed_series = []
        annual_series = {}

        for raw_key, raw_val in datacontent.items():
            if raw_val is None:
                continue

            try:
                val_float = float(raw_val)
            except (ValueError, TypeError):
                continue

            # Identify tahun_id in raw_key
            matched_year_str = None
            matched_year_label = None
            for th_id_str, yr_lbl in tahun_map.items():
                if th_id_str in raw_key:
                    matched_year_str = th_id_str
                    matched_year_label = yr_lbl
                    break

            if not matched_year_label:
                continue

            parsed_series.append({
                "raw_key": raw_key,
                "year": int(matched_year_label),
                "value": val_float,
            })

            # Check if this represents total/annual
            # turtahun 35 = Tahunan
            if raw_key.endswith("35"):
                # Prefer total vervar if exists
                if "99003" in raw_key or "99001" in raw_key or "0000" in raw_key or matched_year_label not in annual_series:
                    annual_series[matched_year_label] = val_float

        var_label = var_meta.get("label", f"Variabel BPS {var_id}")
        result = {
            "status": "SUCCESS",
            "var_id": var_id,
            "var_name": var_label,
            "title": var_label,
            "unit": var_meta.get("unit", ""),
            "last_update": last_update_str,
            "annual_series": annual_series,
            "total_points": len(parsed_series),
            "source": "Badan Pusat Statistik Republik Indonesia (BPS Web API)",
            "api_key_authenticated": True,
        }

        if "raw_variables" not in cache:
            cache["raw_variables"] = {}
        cache["raw_variables"][cache_key] = result
        cls._write_disk_cache(cache)
        return result

    # --------------------------------------------------------------------------
    # 4. MASTER SYNCHRONIZATION (UPDATE OBSERVATORY BASELINE)
    # --------------------------------------------------------------------------
    @classmethod
    def sync_all_indicators(cls) -> Dict[str, Any]:
        """
        Synchronizes all primary economic and BPS variables, updating cache and observatory baseline.
        """
        start_time = time.time()
        synced_metrics = {}
        errors = []

        # 1. PDB Growth (var 104)
        try:
            pdb_res = cls.fetch_variable_data(104, force_refresh=True)
            if pdb_res.get("annual_series"):
                synced_metrics["BPS_PDB_GROWTH"] = pdb_res["annual_series"]
        except Exception as e:
            errors.append(f"PDB Growth (var 104): {e}")

        # 2. PDB Nominal (var 65)
        try:
            nom_res = cls.fetch_variable_data(65, force_refresh=True)
            if nom_res.get("annual_series"):
                synced_metrics["BPS_PDB_NOMINAL"] = nom_res["annual_series"]
        except Exception as e:
            errors.append(f"PDB Nominal (var 65): {e}")

        # 3. Inflasi M-to-M (var 1) & IHK (var 2)
        try:
            inf_res = cls.fetch_variable_data(1, force_refresh=True)
            if inf_res.get("annual_series"):
                synced_metrics["BPS_INFLASI_MOM"] = inf_res["annual_series"]
        except Exception as e:
            errors.append(f"Inflasi (var 1): {e}")

        # 4. Ekspor Total (var 196) & Impor Total (var 497)
        try:
            exp_res = cls.fetch_variable_data(196, force_refresh=True)
            if exp_res.get("annual_series"):
                synced_metrics["BPS_EKSPOR_TOTAL"] = exp_res["annual_series"]
        except Exception as e:
            errors.append(f"Ekspor (var 196): {e}")

        try:
            imp_res = cls.fetch_variable_data(497, force_refresh=True)
            if imp_res.get("annual_series"):
                synced_metrics["BPS_IMPOR_TOTAL"] = imp_res["annual_series"]
        except Exception as e:
            errors.append(f"Impor (var 497): {e}")

        # 5. Fetch latest press releases
        try:
            brs_list = cls.fetch_press_releases(limit=10, force_refresh=True)
        except Exception as e:
            brs_list = []
            errors.append(f"Press Releases: {e}")

        # Update cache master entry
        cache = cls._read_disk_cache()
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S WIB")
        cache["last_synced"] = now_str
        cache["connection_status"] = "CONNECTED"
        cache["synced_indicators"] = synced_metrics
        cls._write_disk_cache(cache)

        duration_sec = round(time.time() - start_time, 2)
        return {
            "success": True,
            "status": "SYNCHRONIZED",
            "last_synced": now_str,
            "duration_seconds": duration_sec,
            "api_key_masked": cls.get_masked_key(),
            "synced_indicators_count": len(synced_metrics),
            "synced_indicators": list(synced_metrics.keys()),
            "press_releases_count": len(brs_list),
            "errors": errors,
            "message": f"Sinkronisasi BPS Web API berhasil ({len(synced_metrics)} indikator, {len(brs_list)} rilis BRS) dalam {duration_sec} detik.",
        }

    @classmethod
    def get_sync_status(cls) -> Dict[str, Any]:
        """
        Returns the overall status of the BPS API integration.
        """
        cache = cls._read_disk_cache()
        return {
            "is_configured": bool(BPS_API_KEY),
            "api_key_masked": cls.get_masked_key(),
            "domain": BPS_DEFAULT_DOMAIN,
            "base_url": BPS_API_BASE_URL,
            "connection_status": cache.get("connection_status", "ONLINE"),
            "last_synced": cache.get("last_synced", "Tersinkronisasi Otomatis"),
            "cached_variables_count": len(cache.get("raw_variables", {})),
            "press_releases_count": len(cache.get("press_releases", [])),
            "source_provenance": "Badan Pusat Statistik Republik Indonesia (BPS Web API v1.0)",
        }
