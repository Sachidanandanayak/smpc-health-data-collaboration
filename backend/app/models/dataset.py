from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=False)
    rows_count = Column(Integer, nullable=False)
    columns_count = Column(Integer, nullable=False)
    status = Column(String, nullable=False, default="UPLOADED") # UPLOADED, ENCRYPTED, COMPUTED
    created_at = Column(DateTime(timezone=True), server_default=func.now())
