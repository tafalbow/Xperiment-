"""
Rolling KPI Service: 8 Key High-Frequency & Market Indicators (Updated Every 3 Days)
Mencakup:
1. BI Rate today
2. Inflasi Agu 2026
3. IKK (Indeks Keyakinan Konsumen)
4. PMI Manufaktur
5. Rupiah (USD/IDR)
6. IHSG
7. Emas Antam /gram
8. Emas Buyback /gram
"""
from typing import Dict, Any


class RollingKPIService:
    @staticmethod
    def get_rolling_kpis() -> Dict[str, Any]:
        """
        Returns the 8 high-frequency indicators with movement comparisons (vs LY, vs LM)
        and short situation diagnostic verdicts.
        """
        return {
            "status": "SUCCESS",
            "cycle_label": "Update Setiap 3 Hari Sekali",
            "edition_note": "Angka kunci resmi terkini per 19 Oktober 2026 · Mengacu rilis resmi Bank Indonesia (BI-Rate 5,75%, Inflasi 3,19%, Cadev $146.320 Juta, JISDOR Rp18.052), BPS (PDB 5,29%), S&P Global (PMI 52,4), IDX (IHSG), dan Antam (Emas Rp2.574.000).",
            "last_updated": "2026-10-19T09:00:00+07:00",
            "next_scheduled_update": "2026-10-22T09:00:00+07:00",
            "kpis": [
                {
                    "id": "bi_rate",
                    "title": "BI-Rate Today",
                    "category": "Moneter",
                    "icon": "🏛️",
                    "period": "Posisi Hari Ini · RDG BI 23 Sep 2026",
                    "value": "5,75%",
                    "unit": "%",
                    "movement_vs_ly": "-25 bps vs LY (Sep 2025: 6,00%)",
                    "movement_vs_lm": "-25 bps vs LM (Agu: 6,00%)",
                    "movement_summary": "-25 bps vs LM (Agu: 6,00%) • -25 bps vs LY",
                    "status_badge": "🟢 Kondusif",
                    "status_verdict": "Kondusif",
                    "status_type": "good",
                    "situation_note": "Suku bunga acuan BI-Rate ditetapkan 5,75% pada RDG 23 September 2026, memangkas 25 bps guna memperluas ruang likuiditas dan pembiayaan perbankan dengan tetap menjaga stabilitas Rupiah.",
                    "source": "Bank Indonesia (Rapat Dewan Gubernur 23 Sep 2026)"
                },
                {
                    "id": "inflasi",
                    "title": "Inflasi IHK (yoy)",
                    "category": "Harga Konsumen",
                    "icon": "📊",
                    "period": "Realisasi BPS / BI Agu 2026",
                    "value": "3,19%",
                    "unit": "% YoY",
                    "movement_vs_ly": "+0,62% vs LY (Agu 2025: 2,57%)",
                    "movement_vs_lm": "+0,08% MoM",
                    "movement_summary": "+0,08% MoM • Terjaga Dalam Sasaran BI (2,5±1%)",
                    "status_badge": "🟢 Terkendali",
                    "status_verdict": "Terkendali",
                    "status_type": "good",
                    "situation_note": "Inflasi tahunan IHK berada di level 3,19% (yoy), konsisten terjaga di dalam koridor rentang sasaran nasional Bank Indonesia 2,5% ± 1% dengan ekspektasi inflasi yang stabil.",
                    "source": "Bank Indonesia & BPS (Panel Indikator Resmi)"
                },
                {
                    "id": "ikk",
                    "title": "IKK (Keyakinan Konsumen)",
                    "category": "Sentimen Publik",
                    "icon": "🛍️",
                    "period": "Survei Konsumen BI Sep 2026",
                    "value": "118,1 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "-3,6 poin vs LY (Sep 2025: 121,7)",
                    "movement_vs_lm": "-0,4 poin vs LM (Agu: 118,5)",
                    "movement_summary": "-0,4 poin vs LM • Indeks Ekspektasi naik ke 128,7",
                    "status_badge": "🟢 Zona Optimis",
                    "status_verdict": "Optimis",
                    "status_type": "good",
                    "situation_note": "Bertahan kokoh di zona optimis (>100) pada level 118,1. Indeks Ekspektasi Konsumen (IEK) meningkat ke 128,7 ditopang keyakinan positif terhadap penghasilan dan ketersediaan lapangan kerja.",
                    "source": "Bank Indonesia (Survei Konsumen Sep 2026)"
                },
                {
                    "id": "pmi_manufaktur",
                    "title": "PMI Manufaktur",
                    "category": "Sektor Riil",
                    "icon": "🏭",
                    "period": "S&P Global Rilis Sep 2026",
                    "value": "52,4 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "+2,6 poin vs LY (49,8)",
                    "movement_vs_lm": "+2,6 poin vs LM (Agu: 49,8)",
                    "movement_summary": "+2,6 poin vs LM • Rebound Kuat ke Ekspansi (Tertinggi sejak Feb)",
                    "status_badge": "🟢 Ekspansi Kuat",
                    "status_verdict": "Ekspansif",
                    "status_type": "good",
                    "situation_note": "Melompat tajam ke 52,4 (level tertinggi sejak Februari 2026); didorong oleh akselerasi pesanan baru, peningkatan produksi pabrik, dan perluasan serapan tenaga kerja industri.",
                    "source": "S&P Global Indonesia PMI (Rilis Sep 2026)"
                },
                {
                    "id": "rupiah",
                    "title": "Rupiah (JISDOR USD/IDR)",
                    "category": "Pasar Valas",
                    "icon": "💵",
                    "period": "Posisi 16 Okt 2026 · Bank Indonesia",
                    "value": "Rp 18.052",
                    "unit": "/ USD",
                    "movement_vs_ly": "-13,7% vs LY (Rp 15.870)",
                    "movement_vs_lm": "-15,1% vs LM (Rp 15.680)",
                    "movement_summary": "Ref. Kurs JISDOR BI 16 Okt 2026 • Cadev Kuat $ 146.320 Juta",
                    "status_badge": "🟡 Volatilitas Valas",
                    "status_verdict": "Perhatian Khusus",
                    "status_type": "warning",
                    "situation_note": "Kurs JISDOR berada di Rp18.052 per USD; stabilitas ditopang cadangan devisa kuat $146.320 juta (6,5 bulan impor) serta intervensi pasar terkoordinasi Bank Indonesia (spot, DNDF, dan SBN).",
                    "source": "Bank Indonesia (JISDOR & Moneter 16 Okt 2026)"
                },
                {
                    "id": "ihsg",
                    "title": "IHSG (Pasar Saham)",
                    "category": "Pasar Modal",
                    "icon": "📈",
                    "period": "Penutupan Terakhir · BEI",
                    "value": "5.185,10 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "-27,8% vs LY (7.182)",
                    "movement_vs_lm": "-32,1% vs LM (7.631)",
                    "movement_summary": "-11,57% (-678,7 poin) pada 16 Okt 2026 • Fase Volatilitas",
                    "status_badge": "🟡 Tekanan Pasar",
                    "status_verdict": "Fase Volatilitas",
                    "status_type": "warning",
                    "situation_note": "Indeks terkoreksi tajam dipicu sentimen wacana reklasifikasi indeks pasar modal global; BEI dan OJK memperkuat protokol pemantauan stabilitas pasar dan likuiditas bursa.",
                    "source": "PT Bursa Efek Indonesia (IDX Penutupan 16 Okt 2026)"
                },
                {
                    "id": "emas_antam",
                    "title": "Emas Antam /gram",
                    "category": "Komoditas & Logam Mulia",
                    "icon": "🪙",
                    "period": "Per 19 Okt 2026 · Logam Mulia",
                    "value": "Rp 2.574.000",
                    "unit": "/ gram",
                    "movement_vs_ly": "+122,8% vs LY (Rp 1.155.000)",
                    "movement_vs_lm": "+73,3% vs LM (Rp 1.485.000)",
                    "movement_summary": "+Rp 2.000 vs Kemarin • Rekor Safe Haven Baru",
                    "status_badge": "🟢 Safe Haven Kuat",
                    "status_verdict": "Kuat / Safe Haven",
                    "status_type": "good",
                    "situation_note": "Harga dasar emas batangan Antam 1 gram resmi mencetak level Rp2.574.000 per gram, bergerak searah lonjakan harga emas spot dunia di tengah tingginya permintaan lindung nilai global.",
                    "source": "PT Aneka Tambang Tbk (Logam Mulia 19 Okt 2026)"
                },
                {
                    "id": "emas_buyback",
                    "title": "Emas Buyback /gram",
                    "category": "Komoditas & Logam Mulia",
                    "icon": "🔄",
                    "period": "Beli Kembali 19 Okt 2026",
                    "value": "Rp 2.389.000",
                    "unit": "/ gram",
                    "movement_vs_ly": "+127,5% vs LY (Rp 1.050.000)",
                    "movement_vs_lm": "+79,3% vs LM (Rp 1.332.000)",
                    "movement_summary": "+Rp 2.000 vs Kemarin • Spread Wajar ~7,2%",
                    "status_badge": "🟢 Sangat Menarik",
                    "status_verdict": "Sangat Menarik",
                    "status_type": "good",
                    "situation_note": "Harga buyback (pembelian kembali) Antam mencapai Rp2.389.000 per gram dengan spread efisien, memberikan realisasi keuntungan optimal bagi investor emas ritel.",
                    "source": "PT Aneka Tambang Tbk (Logam Mulia 19 Okt 2026)"
                }
            ]
        }
