from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from app.core.database import get_db
from app.models.hospital import Hospital
from app.schemas.hospital import HospitalCreate, HospitalUpdate, HospitalResponse
from app.routers.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

@router.get("", response_model=List[HospitalResponse])
def read_hospitals(db: Session = Depends(get_db)) -> Any:
    hospitals = db.query(Hospital).all()
    return hospitals

@router.get("/{id}", response_model=HospitalResponse)
def read_hospital(id: int, db: Session = Depends(get_db)) -> Any:
    hospital = db.query(Hospital).filter(Hospital.id == id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital

@router.post("", response_model=HospitalResponse)
def create_hospital(
    hospital_in: HospitalCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    hospital = Hospital(**hospital_in.model_dump())
    db.add(hospital)
    db.commit()
    db.refresh(hospital)
    return hospital

@router.put("/{id}", response_model=HospitalResponse)
def update_hospital(
    id: int, 
    hospital_in: HospitalUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    hospital = db.query(Hospital).filter(Hospital.id == id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    update_data = hospital_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(hospital, field, value)
        
    db.add(hospital)
    db.commit()
    db.refresh(hospital)
    return hospital

@router.delete("/{id}")
def delete_hospital(
    id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    hospital = db.query(Hospital).filter(Hospital.id == id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    db.delete(hospital)
    db.commit()
    return {"message": "Hospital deleted successfully"}
