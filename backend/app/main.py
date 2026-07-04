from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, hospitals, datasets, computation, analytics, audit
from app.core.database import Base, engine

# Create database tables (in a real production app, use Alembic)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SMPC Healthcare Data Collaboration API",
    description="Backend for Secure Multi-Party Computation for Privacy-Preserving Health Data Collaboration",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(hospitals.router, prefix="/api/hospitals", tags=["Hospitals"])
app.include_router(datasets.router, prefix="/api/datasets", tags=["Datasets"])
app.include_router(computation.router, prefix="/api/computation", tags=["Computation"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(audit.router, prefix="/api/audit", tags=["Audit Logs"])

@app.get("/")
def root():
    return {"message": "Welcome to SMPC Healthcare API"}
