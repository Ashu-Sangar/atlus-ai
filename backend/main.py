import os
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Optional

#import models
from model import SessionBase, SessionCreate, SessionUpdate, SessionDB

# firebase initilization, prevents app already exists error
if not firebase_admin.apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # later restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FocusMate AI Backend running ✅"}

# Session endpoints
@app.post("/sessions/start", response_model=SessionDB)
def start_session(session: SessionCreate):
    try:
        #create new doc ref to get unqiue id
        new_doc_ref = db.collection("sessions").document()
        
        #db object 
        session_db = SessionDB(
            sessionId=new_doc_ref.id,
            **session_in.model_dump(),
            start_time=datetime.utcnow(), 
            session_status=SessionStatus.ACTIVE,
        )
        new_doc_ref.set(session_db.model_dump(mode="json"))
        return session_db
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        

@app.post("/sessions/{session_id}/pause")
def pause_session(session_id: str):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        doc_ref.update({"session_status": SessionStatus.PAUSED})
        
        return{"status": "paused", "session_id": session_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/session/{session_id}/resume")
def resume_session(session_id: str):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        doc_ref.update({"session_status": SessionStatus.ACTIVE})
        
        return{"status": "active", "session_id": session_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/session/{session_id}/end")
def end_session(session_id: str, update_data: SessionUpdate):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session_data = doc.to_dict()
       
        start_time = session_data.get("start_time")
        end_time = datetime.utcnow()

        final_update = {
           "session_status": SessionStatus.COMPLETED,
           "end_time": end_time,
       }

       #option fields
        if update_data.user_focus_rating:
                final_update["user_focus_rating"] = update_data.user_focus_rating
        if update_data.system_focus_score:
                final_update["system_focus_score"] = update_data.system_focus_score
        if update_data.final_duration:
                final_update["final_duration"] = update_data.final_duration
        if update_data.notes:
            final_update["notes"] = update_data.notes
        if update_data.allowed_apps:
            final_update["allowed_apps"] = update_data.allowed_apps
        if update_data.interuption_events:
            final_update["interuption_events"] = update_data.interuption_events
        if update_data.interuption_count:
            final_update["interuption_count"] = update_data.interuption_count

        doc_ref.update(final_update)
        return {"status": "completed", "session_id": session_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))   
        

@app.get("/session/active/{user_id}")
def get_active_session(user_id: int): 
    try: 
        #query for sessions that are either active or paused
        sessions_ref = db.collection("sessions")
        query = sessions_ref.where("user_id", "==", user_id).where("session_status", "in", ["active", "paused"]).limit(1)
        results = query.stream()

        for doc in results:
            data = doc.to_dict()
            data["session_id"] = doc.id
            return data 

        return None 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
        