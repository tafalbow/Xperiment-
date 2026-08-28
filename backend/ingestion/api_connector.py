import json
from typing import List, Dict, Any
from backend.ingestion.base import BaseConnector

class ApiConnector(BaseConnector):
    """
    Connector for Government Official Web APIs (e.g. BPS Web API, Kemenkeu Satu Data).
    Note: When official live API credentials are not bound, operates in explicit DEMO simulation mode.
    """
    def __init__(self, source_id: str = "SRC-BPS"):
        super().__init__(source_id, is_demo=True)

    def fetch_raw_data(self) -> Dict[str, Any]:
        # Simulated payload from official API response structure
        return {
            "status": "OK",
            "source": self.source_id,
            "connector_mode": "DEMO SIMULATION — NOT LIVE OFFICIAL FEED",
            "data": [
                {
                    "indicator_id": "IND-GDP-GROWTH-YOY",
                    "period": "2024",
                    "period_type": "Annual",
                    "value": 5.05,
                    "unit": "Persen (%)",
                    "status": "Observed",
                    "geography": "Indonesia",
                    "publication_id": "PUB-BPS-BRS-2025-01",
                    "page_reference": "Tabel 1",
                    "table_reference": "Pertumbuhan PDB Menurut Lapangan Usaha"
                },
                {
                    "indicator_id": "IND-INFLATION-CPI-YOY",
                    "period": "2024",
                    "period_type": "Annual",
                    "value": 1.57,
                    "unit": "Persen (%)",
                    "status": "Observed",
                    "geography": "Indonesia",
                    "publication_id": "PUB-BPS-BRS-2025-01",
                    "page_reference": "Halaman 4",
                    "table_reference": "Tabel Inflasi IHK Nasional"
                }
            ]
        }

    def parse_records(self, raw_data: Any) -> List[Dict[str, Any]]:
        return raw_data.get("data", [])
