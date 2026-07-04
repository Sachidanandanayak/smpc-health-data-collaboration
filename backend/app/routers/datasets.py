from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import Any, List
from app.core.database import get_db
from app.models.dataset import Dataset
from app.models.audit import AuditLog
from app.schemas.dataset import DatasetResponse, DatasetCreate
from app.routers.deps import get_current_active_user
from app.models.user import User
from app.services.dataset_utils import save_upload_file, process_csv

router = APIRouter()

@router.post("/upload", response_model=dict)
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted.")
    
    if current_user.hospital_id is None:
        raise HTTPException(status_code=400, detail="User must belong to a hospital to upload datasets.")
        
    try:
        # Save file
        file_path = await save_upload_file(file, current_user.id)
        
        # Process CSV
        csv_stats = process_csv(file_path)
        
        # Save DB record
        dataset = Dataset(
            name=file.filename,
            filename=file.filename,
            file_path=file_path,
            uploaded_by=current_user.id,
            hospital_id=current_user.hospital_id,
            rows_count=csv_stats["rows_count"],
            columns_count=csv_stats["columns_count"]
        )
        db.add(dataset)
        
        # Audit log
        audit = AuditLog(user_id=current_user.id, action="UPLOAD_DATASET")
        db.add(audit)
        
        db.commit()
        db.refresh(dataset)
        
        return {
            "dataset_id": dataset.id,
            "rows": csv_stats["rows_count"],
            "columns": csv_stats["columns_count"],
            "column_names": csv_stats["column_names"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process upload: {str(e)}")

@router.get("", response_model=List[DatasetResponse])
def get_datasets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    return db.query(Dataset).all()

@router.get("/{id}", response_model=DatasetResponse)
def get_dataset(
    id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    dataset = db.query(Dataset).filter(Dataset.id == id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset

@router.delete("/{id}")
def delete_dataset(
    id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    dataset = db.query(Dataset).filter(Dataset.id == id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    db.delete(dataset)
    
    # Audit log
    audit = AuditLog(user_id=current_user.id, action="DELETE_DATASET")
    db.add(audit)
    
    db.commit()
    return {"message": "Dataset deleted successfully"}
