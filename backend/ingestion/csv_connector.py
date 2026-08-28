import csv
import io
from typing import List, Dict, Any
from backend.ingestion.base import BaseConnector

class CsvExcelConnector(BaseConnector):
    """
    Connector for CSV / Excel government statistical releases.
    Parses national header rows, checks column mapping, and returns standardized observation dictionaries.
    """
    def __init__(self, source_id: str = "SRC-KEMENKEU-DJP"):
        super().__init__(source_id, is_demo=True)

    def fetch_raw_data(self) -> str:
        # Realistic sample CSV release of national tax revenues
        return """indicator_id,period,period_type,value,unit,status,geography,publication_id,page_reference,table_reference
IND-TAX-REV-TOTAL,2023,Annual,1869.2,Triliun Rupiah,Observed,Indonesia,PUB-LKPP-2023-AUDITED,Hal 48,Tabel 2.1
IND-TAX-REV-TOTAL,2024,Annual,1924.9,Triliun Rupiah,Provisional,Indonesia,PUB-APBN-KITA-2024-12,Hal 12,Tabel Realisasi Pajak
"""

    def parse_records(self, raw_data: Any) -> List[Dict[str, Any]]:
        records = []
        reader = csv.DictReader(io.StringIO(raw_data.strip()))
        for row in reader:
            val = float(row["value"]) if row["value"] and row["value"] != "N/A" else None
            records.append({
                "indicator_id": row["indicator_id"].strip(),
                "period": row["period"].strip(),
                "period_type": row["period_type"].strip(),
                "value": val,
                "unit": row["unit"].strip(),
                "status": row["status"].strip(),
                "geography": row.get("geography", "Indonesia").strip(),
                "publication_id": row["publication_id"].strip(),
                "page_reference": row.get("page_reference", "").strip(),
                "table_reference": row.get("table_reference", "").strip()
            })
        return records
