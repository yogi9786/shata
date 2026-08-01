from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import datetime
from ..db import SessionLocal
from ..models import ContactMessage

router = APIRouter(prefix="/api/contact", tags=["contact"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("")
def submit_contact_form(request: ContactRequest, db: Session = Depends(get_db)):
    try:
        new_message = ContactMessage(
            name=request.name,
            email=request.email,
            subject=request.subject,
            message=request.message,
            created_at=datetime.utcnow().isoformat()
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        return {"status": "success", "message": "Message received successfully."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="An error occurred while saving the message.")
