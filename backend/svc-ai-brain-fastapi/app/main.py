# backend/svc-ai-brain-fastapi/app/main.py
from fastapi import FastAPI

app = FastAPI(title="Navigator AI Brain")

@app.get("/")
def read_root():
    return {"message": "Navigator AI Brain is online."}