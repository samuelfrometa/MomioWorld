from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FamilyBase(BaseModel):
    name: str
    nickname: Optional[str] = None
    description: Optional[str] = None
    avatar_url: Optional[str] = None
    birth_date: Optional[datetime] = None


class FamilyCreate(FamilyBase):
    pass


class FamilyResponse(FamilyBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
