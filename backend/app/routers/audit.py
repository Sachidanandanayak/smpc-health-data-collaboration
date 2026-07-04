from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Any, List
from app.core.database import get_db
from app.models.audit import AuditLog
from app.schemas.audit import AuditLogResponse
from app.routers.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

@router.get("", response_model=List[AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).all()
