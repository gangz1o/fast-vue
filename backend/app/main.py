from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .models import Item, User
from .routes import items_router, auth_router
from .init_db import init_db

# Create the database tables
Base.metadata.create_all(bind=engine)

# Initialize the database with default data
init_db()

app = FastAPI(
    title="FastAPI + SQLite + Vue Template",
    description="A template for FastAPI with SQLite backend and Vue frontend",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vue dev server default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items_router, prefix="/api", tags=["items"])
app.include_router(auth_router, prefix="/api", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI + SQLite + Vue Template API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
