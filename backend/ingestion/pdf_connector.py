from typing import List, Dict, Any
from backend.ingestion.base import BaseConnector

class PdfDocumentConnector(BaseConnector):
    """
    Connector for extracting structured tabular observations from official PDF government documents
    (e.g., LKPP Lampiran 1.A, UU APBN Lampiran Rincian Anggaran).
    """
    def __init__(self, source_id: str = "SRC-KEMENKEU-LKPP"):
        super().__init__(source_id, is_demo=True)

    def fetch_raw_data(self) -> Dict[str, Any]:
        # Simulated extraction result of parsed PDF tables
        return {
            "document_name": "LKPP_TA_2023_Audited_Lampiran_1A.pdf",
            "source_type": "PDF Table Extraction (Demo Mock)",
            "extracted_tables": [
                {
                    "table_name": "LAPORAN REALISASI ANGGARAN PENDAPATAN PEMERINTAH PUSAT",
                    "page": 45,
                    "rows": [
                        {
                            "indicator_id": "IND-APBN-REV-TOT",
                            "period": "2023",
                            "period_type": "Annual",
                            "value": 2784.0,
                            "unit": "Triliun Rupiah",
                            "status": "Observed",
                            "geography": "Indonesia",
                            "publication_id": "PUB-LKPP-2023-AUDITED",
                            "page_reference": "Hal 45",
                            "table_reference": "Lampiran 1.A"
                        },
                        {
                            "indicator_id": "IND-APBN-EXP-TOT",
                            "period": "2023",
                            "period_type": "Annual",
                            "value": 3121.9,
                            "unit": "Triliun Rupiah",
                            "status": "Observed",
                            "geography": "Indonesia",
                            "publication_id": "PUB-LKPP-2023-AUDITED",
                            "page_reference": "Hal 45",
                            "table_reference": "Lampiran 1.A"
                        }
                    ]
                }
            ]
        }

    def parse_records(self, raw_data: Any) -> List[Dict[str, Any]]:
        records = []
        for tbl in raw_data.get("extracted_tables", []):
            for r in tbl.get("rows", []):
                records.append(r)
        return records
