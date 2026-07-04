from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class HospitalBase(BaseModel):
    name: str
    location: str
    contact_email: EmailStr
    description: Optional[str] = None

class HospitalCreate(HospitalBase):
    pass

class HospitalUpdate(HospitalBase):
    pass

class HospitalResponse(HospitalBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
