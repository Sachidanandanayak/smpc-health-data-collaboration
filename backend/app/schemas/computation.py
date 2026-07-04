from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComputationBase(BaseModel):
    name: str
    algorithm: str
    status: str = "PENDING"
    accuracy: Optional[float] = None

class ComputationCreate(BaseModel):
    name: str
    algorithm: str
    dataset_ids: list[int]

class ComputationResponse(ComputationBase):
    id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
