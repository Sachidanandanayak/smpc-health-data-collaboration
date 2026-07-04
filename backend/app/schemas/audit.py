from pydantic import BaseModel
from datetime import datetime

class AuditLogBase(BaseModel):
    user_id: int
    action: str

class AuditLogCreate(AuditLogBase):
    pass

class AuditLogResponse(AuditLogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
