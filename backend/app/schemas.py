from pydantic import BaseModel, ConfigDict
from typing import List, Optional

# Event Schemas
class EventBase(BaseModel):
    title: str
    category: str
    location: str
    date: str
    rating: float
    reviewsCount: int
    tag: Optional[str] = None
    badge: Optional[str] = None
    description: str
    fullDescription: Optional[str] = None
    image: str
    capacity: Optional[str] = None
    duration: Optional[str] = None
    organizer: Optional[str] = None
    highlights: Optional[List[str]] = None
    featured: bool = False
    isPopular: bool = False

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class EventsListResponse(BaseModel):
    events: List[EventOut]

class EventDetailsResponse(BaseModel):
    event: EventOut

# Booking Schemas
class BookingCreate(BaseModel):
    eventType: str
    startDate: str
    endDate: str
    budget: str
    location: str
    userName: str
    userEmail: str
    userPhone: str
    specialRequests: Optional[str] = None
    paymentStatus: Optional[str] = "Pending"

class BookingOut(BookingCreate):
    id: int
    bookingId: str
    model_config = ConfigDict(from_attributes=True)

class BookingResponse(BaseModel):
    bookingId: str
    message: str
    details: BookingOut

# User Auth Schemas
class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    
    model_config = ConfigDict(from_attributes=True)

class AuthResponse(BaseModel):
    message: str
    user: UserOut
    token: str
