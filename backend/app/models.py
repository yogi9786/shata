from sqlalchemy import Column, Integer, String, Float, Boolean, Text, JSON
from .db import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    date = Column(String(100), nullable=False)
    rating = Column(Float, default=5.0)
    reviewsCount = Column(Integer, default=0)
    tag = Column(String(100), nullable=True)
    badge = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    fullDescription = Column(Text, nullable=True)
    image = Column(String(500), nullable=False)
    capacity = Column(String(100), nullable=True)
    duration = Column(String(100), nullable=True)
    organizer = Column(String(200), nullable=True)
    highlights = Column(JSON, nullable=True)  # Stored as JSON array
    featured = Column(Boolean, default=False)
    isPopular = Column(Boolean, default=False)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    bookingId = Column(String(50), unique=True, index=True, nullable=False)
    eventType = Column(String(100), nullable=False)
    startDate = Column(String(50), nullable=False)
    endDate = Column(String(50), nullable=False)
    budget = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    userName = Column(String(100), nullable=False)
    userEmail = Column(String(100), nullable=False)
    userPhone = Column(String(50), nullable=False)
    specialRequests = Column(Text, nullable=True)
    paymentStatus = Column(String(50), default="Pending")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=False)
    hashed_password = Column(String(200), nullable=False)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(String(50), nullable=True)
