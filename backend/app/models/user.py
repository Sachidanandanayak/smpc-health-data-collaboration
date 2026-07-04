from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False) # SUPER_ADMIN, HOSPITAL_ADMIN, RESEARCHER
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
