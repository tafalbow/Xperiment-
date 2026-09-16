"""
Unit tests for Master Admin Service and Router
Verifying authentication, confirmation email outbox, password setting,
web traffic logging, and access/download audit trails for lubistaniafatimah@gmail.com
"""

from fastapi.testclient import TestClient
from backend.app import app
from backend.services.admin_service import AdminService, TEST_ADMIN_EMAIL

client = TestClient(app)

def test_admin_email_confirmation_flow():
    # 1. Reject unauthorized email
    unauth_res = client.post("/api/admin/send-confirmation", json={"email": "hacker@example.com"})
    assert unauth_res.status_code == 400

    # 2. Accept Master Admin email
    res = client.post("/api/admin/send-confirmation", json={"email": TEST_ADMIN_EMAIL})
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert data["recipient"] == TEST_ADMIN_EMAIL
    assert "token" in data
    token = data["token"]

    # 3. Set password with invalid short password (< 6 chars)
    short_pw = client.post("/api/admin/set-password", json={
        "token": token,
        "password": "123",
        "email": TEST_ADMIN_EMAIL
    })
    assert short_pw.status_code == 400

    # 4. Set password with valid password
    valid_pw = client.post("/api/admin/set-password", json={
        "token": token,
        "password": "MasterAdminSecurePass2026!",
        "email": TEST_ADMIN_EMAIL
    })
    assert valid_pw.status_code == 200
    assert valid_pw.json()["success"] is True

    # 5. Login with wrong password
    wrong_login = client.post("/api/admin/login", json={
        "email": TEST_ADMIN_EMAIL,
        "password": "WrongPassword999"
    })
    assert wrong_login.status_code == 401

    # 6. Login with correct password
    correct_login = client.post("/api/admin/login", json={
        "email": TEST_ADMIN_EMAIL,
        "password": "MasterAdminSecurePass2026!"
    })
    assert correct_login.status_code == 200
    login_data = correct_login.json()
    assert login_data["success"] is True
    assert login_data["email"] == TEST_ADMIN_EMAIL
    assert login_data["role"] == "MASTER_ADMIN"
    assert "token" in login_data

def test_traffic_logging_and_stats():
    # 1. Log a tab visit
    log_res = client.post("/api/traffic/log", json={"tab_name": "cukai-bps", "path": "/cukai-bps"})
    assert log_res.status_code == 200
    assert log_res.json()["status"] == "LOGGED"

    # 2. Fetch traffic stats
    stats_res = client.get("/api/admin/traffic-stats")
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert "total_visits" in stats
    assert "unique_visitors" in stats
    assert "daily_trend" in stats
    assert "popular_tabs" in stats
    assert len(stats["daily_trend"]) > 0

def test_access_and_download_logs():
    # 1. Record a researcher
    rec_res = client.post("/api/admin/record-researcher", json={
        "email": "test.peneliti@bappenas.go.id",
        "name": "Dr. Peneliti Bappenas",
        "purpose": "Kajian Kebijakan Makroekonomi"
    })
    assert rec_res.status_code == 200

    # 2. Get access and download logs
    logs_res = client.get("/api/admin/access-download-logs")
    assert logs_res.status_code == 200
    logs = logs_res.json()
    assert "access_logs" in logs
    assert "download_logs" in logs
    assert len(logs["access_logs"]) > 0
    assert len(logs["download_logs"]) > 0
