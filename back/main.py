from src.database.db import engine, Base

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.api import router as api_router

app = FastAPI(title="SYBO GAME SERVER",
              description="Sample FastAPI Application demo for SYBO with Swagger and Sqlalchemy",
              version="1.0.0", )

Base.metadata.create_all(bind=engine)

origins = ["http://localhost:8005", "http://localhost:3000"]

# http://localhost:8003 is the frontend

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health-check")
def read_root():
    return {'ok'}


app.include_router(api_router)
