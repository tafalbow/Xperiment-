"""
==============================================================================
INDOEKONOMI data — Master Admin Router
Specialized governance endpoints for lubistaniafatimah@gmail.com
==============================================================================
"""

from fastapi import APIRouter, Request, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
from backend.services.admin_service import AdminService, MASTER_ADMIN_EMAIL

router = APIRouter(prefix="/api", tags=["Master Admin & Governance"])

class ConfirmationRequest(BaseModel):
    email: Optional[str] = MASTER_ADMIN_EMAIL

class SetPasswordRequest(BaseModel):
    token: str
    password: str
    email: Optional[str] = MASTER_ADMIN_EMAIL

class LoginRequest(BaseModel):
    email: str
    password: str

class TrafficLogRequest(BaseModel):
    tab_name: str
    path: Optional[str] = None

class ResearcherRecordRequest(BaseModel):
    email: str
    name: Optional[str] = None
    purpose: Optional[str] = None
    purpose_other: Optional[str] = None
    source_type: Optional[str] = None


@router.post("/admin/send-confirmation")
async def send_confirmation(payload: ConfirmationRequest):
    """
    Sends official confirmation email and token to lubistaniafatimah@gmail.com.
    """
    target_email = payload.email or MASTER_ADMIN_EMAIL
    result = AdminService.send_confirmation_email(target_email)
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message"))
    return result


@router.post("/admin/set-password")
async def set_password(payload: SetPasswordRequest):
    """
    Verifies token and sets the master admin password.
    """
    result = AdminService.set_admin_password(
        token=payload.token,
        new_password=payload.password,
        email=payload.email
    )
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message"))
    return result


@router.post("/admin/login")
async def admin_login(payload: LoginRequest):
    """
    Logs in Master Admin (lubistaniafatimah@gmail.com) with password.
    """
    result = AdminService.admin_login(payload.email, payload.password)
    if not result.get("success"):
        raise HTTPException(status_code=401, detail=result.get("message"))
    return result


@router.get("/admin/traffic-stats")
async def get_traffic_stats():
    """
    Returns aggregated web traffic metrics for Master Admin analytics.
    """
    return AdminService.get_traffic_stats()


@router.get("/admin/access-download-logs")
async def get_access_download_logs():
    """
    Returns audit logs of researchers who accessed the site and data downloaded.
    """
    return AdminService.get_access_and_download_logs()


@router.post("/traffic/log")
async def log_traffic(payload: TrafficLogRequest, request: Request):
    """
    Public telemetry endpoint to record tab visits.
    """
    client_ip = request.client.host if request.client else "127.0.0.1"
    user_agent = request.headers.get("user-agent", "Unknown Browser")
    return AdminService.log_web_traffic(
        tab_name=payload.tab_name,
        path=payload.path or f"/{payload.tab_name}",
        ip_address=client_ip,
        user_agent=user_agent
    )


@router.post("/admin/record-researcher")
async def record_researcher(payload: ResearcherRecordRequest):
    """
    Records researcher access in backend SQLite.
    """
    return AdminService.record_researcher_access(
        email=payload.email,
        name=payload.name,
        purpose=payload.purpose,
        purpose_other=payload.purpose_other,
        source_type=payload.source_type
    )
