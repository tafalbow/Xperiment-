from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseConnector(ABC):
    """Abstract Base Class for GovTech Data Ingestion Connectors."""

    def __init__(self, source_id: str, is_demo: bool = True):
        self.source_id = source_id
        self.is_demo = is_demo

    @abstractmethod
    def fetch_raw_data(self) -> Any:
        """Fetch raw payload from official source endpoint, file, or document."""
        pass

    @abstractmethod
    def parse_records(self, raw_data: Any) -> List[Dict[str, Any]]:
        """Parse raw content into standardized national observation record dictionaries."""
        pass
