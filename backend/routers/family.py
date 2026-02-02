from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db import get_db
from models.family import Family
from schemas.family import FamilyCreate, FamilyResponse

router = APIRouter(
    prefix="/family",
    tags=["family"]
)


@router.post(
    "/",
    response_model=FamilyResponse,
    status_code=status.HTTP_201_CREATED
)
def create_family_member(
    family: FamilyCreate,
    db: Session = Depends(get_db)
):
    db_family = Family(
        user_id=1,
        **family.model_dump()
    )

    db.add(db_family)
    db.commit()
    db.refresh(db_family)

    return db_family


@router.get(
    "/",
    response_model=list[FamilyResponse]
)
def list_family_members(db: Session = Depends(get_db)):
    return db.query(Family).all()


@router.get(
    "/{family_id}",
    response_model=FamilyResponse
)
def get_family_member(
    family_id: int,
    db: Session = Depends(get_db)
):
    family = db.query(Family).filter(Family.id == family_id).first()
    if not family:
        raise HTTPException(
            status_code=404,
            detail="Family member not found"
        )
    return family


@router.put(
    "/{family_id}",
    response_model=FamilyResponse
)
def update_family_member(
    family_id: int,
    family: FamilyCreate,
    db: Session = Depends(get_db)
):
    db_family = db.query(Family).filter(Family.id == family_id).first()
    if not db_family:
        raise HTTPException(
            status_code=404,
            detail="Family member not found"
        )

    for key, value in family.model_dump().items():
        setattr(db_family, key, value)

    db.commit()
    db.refresh(db_family)

    return db_family



@router.delete(
    "/{family_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_family_member(
    family_id: int,
    db: Session = Depends(get_db)
):
    family = db.query(Family).filter(Family.id == family_id).first()
    if not family:
        raise HTTPException(
            status_code=404,
            detail="Family member not found"
        )

    db.delete(family)
    db.commit()
