import pytest
from backend.services.crosswalk_service import CrosswalkService

def test_crosswalk_retrieval():
    rules = CrosswalkService.get_all_crosswalk_rules()
    assert len(rules) > 0
    assert any("Belanja Rutin" in r["original_classification"] for r in rules)
    assert any("Belanja Modal" in r["standardized_classification"] for r in rules)

def test_lkpp_financial_statements():
    res = CrosswalkService.get_lkpp_financial_statements()
    assert "lra_pendapatan" in res
    assert "neraca" in res
    assert "arus_kas" in res
    assert len(res["lra_pendapatan"]) > 10
    assert len(res["neraca"]) > 10
    assert len(res["arus_kas"]) > 10
    assert res["lra_pendapatan"][0]["kode_akun"] == "4"
    assert res["neraca"][0]["kode_akun"] == "1"
    assert res["arus_kas"][0]["kode_aktivitas"] == "A"
