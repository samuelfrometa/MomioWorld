from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db import get_db
from models.ticket import Ticket
from schemas.ticket import TicketCreate, TicketResponse

router = APIRouter(
    prefix="/tickets",
    tags=["tickets"]
)

@router.post(
    "/",
    response_model=TicketResponse,
    status_code=status.HTTP_201_CREATED
)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    db_ticket = Ticket(
        user_id=1,
        **ticket.model_dump()
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


@router.get(
    "/",
    response_model=list[TicketResponse]
)
def list_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).all()


@router.get(
    "/{ticket_id}",
    response_model=TicketResponse
)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )
    return ticket


@router.put(
    "/{ticket_id}",
    response_model=TicketResponse
)
def update_ticket(
    ticket_id: int,
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    for key, value in ticket.model_dump().items():
        setattr(db_ticket, key, value)

    db.commit()
    db.refresh(db_ticket)

    return db_ticket


@router.delete(
    "/{ticket_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    db.delete(ticket)
    db.commit()
