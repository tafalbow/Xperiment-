"""
Unit & Integration Tests for News & Economic Theory Observatory (9 Categories x Top 3 News)
"""

from fastapi.testclient import TestClient
from backend.app import app
from backend.services.news_theory_service import NewsTheoryService

client = TestClient(app)


def test_news_theory_service_structure():
    data = NewsTheoryService.get_news_and_theories()
    assert data["status"] == "SUCCESS"
    assert data["total_categories"] == 9
    assert data["total_news"] == 27

    expected_categories = [
        "ekonomi_internasional",
        "politik_internasional",
        "ekonomi_nasional",
        "politik_nasional",
        "teknologi_nasional",
        "investasi_nasional",
        "industri_rokok_tembakau",
        "sustainable_energi",
        "sosial",
    ]
    actual_categories = [c["category_id"] for c in data["categories"]]
    assert actual_categories == expected_categories

    for cat in data["categories"]:
        assert len(cat["items"]) == 3
        for item in cat["items"]:
            assert item["title"]
            assert isinstance(item.get("paragraphs"), list)
            assert len(item["paragraphs"]) == 2
            assert all(len(p.strip()) > 30 for p in item["paragraphs"])
            assert item["official_url"].startswith("https://")
            assert item["theory_name"]
            assert item["theory_explanation"]
            assert item["policy_implication"]
            assert item["is_within_7_days"] is True
            assert 0 <= item["days_ago"] < 7


def test_api_news_theory_endpoint():
    response = client.get("/api/news-theory")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "SUCCESS"
    assert body["rolling_window_days"] == 7
    assert body["total_categories"] == 9
    assert body["total_news"] == 27


def test_api_news_theory_sync_7days():
    response = client.post("/api/news-theory/sync?days_back=7")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "SUCCESS"
    assert body["synced_on_initial_load"] is True
    assert body["rolling_window_days"] == 7
    assert body["total_news"] == 27


def test_api_news_theory_filter_and_search():
    res_cat = client.get("/api/news-theory?category_id=industri_rokok_tembakau")
    assert res_cat.status_code == 200
    body_cat = res_cat.json()
    assert body_cat["total_categories"] == 1
    assert body_cat["total_news"] == 3
    assert body_cat["categories"][0]["category_id"] == "industri_rokok_tembakau"

    res_search = client.get("/api/news-theory?search=Laffer")
    assert res_search.status_code == 200
    body_search = res_search.json()
    assert body_search["total_news"] >= 1

