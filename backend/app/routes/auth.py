import hashlib
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..deps import get_db
from ..models import User as DBUser
from ..schemas import UserCreate, UserLogin, AuthResponse, UserOut

router = APIRouter(prefix="/api/auth", tags=["auth"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    existing_user = db.query(DBUser).filter(DBUser.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address is already registered."
        )
    
    # Hash password and create user
    hashed = hash_password(payload.password)
    user = DBUser(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        hashed_password=hashed
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return AuthResponse(
        message="User registered successfully",
        user=UserOut.model_validate(user),
        token=f"mock-jwt-token-{user.id}"
    )

@router.post("/login", response_model=AuthResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == payload.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )
    
    hashed = hash_password(payload.password)
    if user.hashed_password != hashed:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    return AuthResponse(
        message="Login successful",
        user=UserOut.model_validate(user),
        token=f"mock-jwt-token-{user.id}"
    )
