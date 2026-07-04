from pydantic import BaseModel
from datetime import datetime

class DatasetBase(BaseModel):
    name: str
    filename: str
    file_path: str
    uploaded_by: int
    hospital_id: int
    rows_count: int
    columns_count: int
    status: str = "UPLOADED"

class DatasetCreate(DatasetBase):
    pass

class DatasetResponse(DatasetBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
