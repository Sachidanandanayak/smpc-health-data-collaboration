from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from app.core.database import Base

class Computation(Base):
    __tablename__ = "computations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    algorithm = Column(String, nullable=False)
    status = Column(String, nullable=False, default="PENDING") # PENDING, RUNNING, COMPLETED, FAILED
    accuracy = Column(Float, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
