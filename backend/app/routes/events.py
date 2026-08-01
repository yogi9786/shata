from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..deps import get_db
from ..models import Event as DBEvent
from ..schemas import EventsListResponse, EventDetailsResponse

router = APIRouter(prefix="/api/events", tags=["events"])

@router.get("", response_model=EventsListResponse)
def read_events(db: Session = Depends(get_db)):
    """Fetch all events from SQLite database."""
    events = db.query(DBEvent).all()
    return {"events": events}

@router.get("/{event_id}", response_model=EventDetailsResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    """Fetch a single event from SQLite by ID."""
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"event": event}
