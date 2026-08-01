from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from ..deps import get_db
from ..models import Booking as DBBooking
from ..schemas import BookingCreate, BookingResponse, BookingOut

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

@router.post("", response_model=BookingResponse)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    """Saves a new booking record in the SQLite database and confirms."""
    generated_id = f"BKG-{str(uuid.uuid4())[:8].upper()}"
    
    db_booking = DBBooking(
        bookingId=generated_id,
        eventType=booking.eventType,
        startDate=booking.startDate,
        endDate=booking.endDate,
        budget=booking.budget,
        location=booking.location,
        userName=booking.userName,
        userEmail=booking.userEmail,
        userPhone=booking.userPhone,
        specialRequests=booking.specialRequests,
        paymentStatus=booking.paymentStatus or "Pending"
    )
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    return BookingResponse(
        bookingId=generated_id,
        message="Booking successfully processed and saved to database.",
        details=BookingOut.model_validate(db_booking)
    )
