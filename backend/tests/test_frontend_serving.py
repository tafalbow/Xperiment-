import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_serve_index_html():
    response = client.get("/")
    assert response.status_code == 200
    assert "INDOEKONOMI data — Indonesia Economic Data Observatory" in response.text
    assert "indoekonomi.data.go.id" in response.text
    assert "tab-btn-home" in response.text
    assert "tab-btn-calendar" in response.text
    assert "tab-btn-about" in response.text

def test_serve_app_js():
    response = client.get("/app.js")
    assert response.status_code == 200
    assert "HomeView" in response.text
    assert "AgriCalendarComponent" in response.text
    assert "AboutView" in response.text

def test_serve_home_view_js():
    response = client.get("/components/home_view.js")
    assert response.status_code == 200
    assert "class HomeView" in response.text

def test_serve_agri_calendar_js():
    response = client.get("/components/agri_calendar.js")
    assert response.status_code == 200
    assert "class AgriCalendarComponent" in response.text

def test_serve_about_view_js():
    response = client.get("/components/about_view.js")
    assert response.status_code == 200
    assert "class AboutView" in response.text
