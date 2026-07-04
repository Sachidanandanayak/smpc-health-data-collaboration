from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Any
from app.core.database import get_db
from app.models.hospital import Hospital
from app.models.user import User
from app.models.dataset import Dataset
from app.models.computation import Computation
from app.routers.deps import get_current_active_user

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    total_hospitals = db.query(Hospital).count()
    total_users = db.query(User).count()
    total_datasets = db.query(Dataset).count()
    total_computations = db.query(Computation).count()
    
    avg_accuracy = db.query(func.avg(Computation.accuracy)).filter(Computation.status == "COMPLETED").scalar()
    
    return {
        "total_hospitals": total_hospitals,
        "total_users": total_users,
        "total_datasets": total_datasets,
        "total_computations": total_computations,
        "average_accuracy": round(avg_accuracy, 2) if avg_accuracy else 0.0
    }
