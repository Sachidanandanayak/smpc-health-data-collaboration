from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from app.core.database import get_db
from app.models.computation import Computation
from app.models.dataset import Dataset
from app.models.audit import AuditLog
from app.schemas.computation import ComputationResponse, ComputationCreate
from app.routers.deps import get_current_active_user
from app.models.user import User
from app.services.smpc import simulate_smpc_encryption
from app.services.ml import train_model

router = APIRouter()

@router.post("/start", response_model=dict)
def start_computation(
    comp_in: ComputationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not comp_in.dataset_ids:
        raise HTTPException(status_code=400, detail="No datasets provided.")
        
    datasets = db.query(Dataset).filter(Dataset.id.in_(comp_in.dataset_ids)).all()
    if len(datasets) != len(comp_in.dataset_ids):
        raise HTTPException(status_code=404, detail="One or more datasets not found.")
        
    # Simulated SMPC Step
    smpc_result = simulate_smpc_encryption(comp_in.dataset_ids)
    
    # Update dataset statuses
    for ds in datasets:
        ds.status = "ENCRYPTED"
    db.commit()
    
    # Create Computation Record
    computation = Computation(
        name=comp_in.name,
        algorithm=comp_in.algorithm,
        status="RUNNING",
        created_by=current_user.id
    )
    db.add(computation)
    db.commit()
    db.refresh(computation)
    
    # ML Training Step
    file_paths = [ds.file_path for ds in datasets]
    try:
        metrics = train_model(file_paths, comp_in.algorithm)
        
        # Update Computation
        computation.status = "COMPLETED"
        computation.accuracy = metrics.get("accuracy")
        
        # Update datasets status to COMPUTED
        for ds in datasets:
            ds.status = "COMPUTED"
            
        # Audit log
        audit = AuditLog(user_id=current_user.id, action="START_COMPUTATION")
        db.add(audit)
        
        db.commit()
        return metrics
    except Exception as e:
        computation.status = "FAILED"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Computation failed: {str(e)}")

@router.get("", response_model=List[ComputationResponse])
def get_computations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    return db.query(Computation).all()

@router.get("/{id}", response_model=ComputationResponse)
def get_computation(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    comp = db.query(Computation).filter(Computation.id == id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Computation not found")
    return comp
