from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TicketBase(BaseModel):
    movie_title: str
    cinema_name: str
    room: Optional[int] = None
    seat: Optional[int] = None
    date: datetime
    rate: Optional[int] = None
    favorite: Optional[bool] = False
    ticket_image_url: Optional[str] = None


class TicketCreate(TicketBase):
    pass


class TicketResponse(TicketBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
