from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI + React TSX Template API")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the FastAPI + React TSX Backend API!",
        "status": "online"
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "database": "not_configured",
        "version": "1.0.0"
    }

@app.get("/api/hello")
async def hello():
    return {
        "message": "Hello from the FastAPI backend!",
        "data": {
            "items": [
                {"id": 1, "name": "Item One", "description": "High performance backend connection standard"},
                {"id": 2, "name": "Item Two", "description": "Beautiful modern responsive interface design"},
                {"id": 3, "name": "Item Three", "description": "Rapid development workflow with Vite and FastAPI"}
            ]
        }
    }
