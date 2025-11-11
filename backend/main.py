import os
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FocusMate AI Backend running ✅"}

@app.get("/api/test")
def test_firestore():
    doc_ref = db.collection("users").document("test_user")
    doc_ref.set({"status": "active"})
    return {"ok": True}