import os
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from typing import Optional

# Import your corrected models
from model import SessionBase, SessionCreate, SessionUpdate, SessionDB, SessionStatus

# --- Firebase Initialization ---
# --- Firebase Initialization ---
try:
    firebase_admin.get_app()
except ValueError:
    # Ensure this path matches your actual key file location
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FocusMate AI Backend running ✅"}


# --- Session Endpoints ---

@app.post("/sessions/start", response_model=SessionDB)
def start_session(session_in: SessionCreate):
    try:
        # Generate a new document reference to get a unique ID
        new_doc_ref = db.collection("sessions").document()
        
        # Use timezone-aware UTC for consistency
        current_time = datetime.now(timezone.utc)

        # Create the DB object
        # NOTE: We use session_id (snake_case) to match your Frontend Interface
        session_db = SessionDB(
            session_id=new_doc_ref.id, 
            **session_in.model_dump(),
            start_time=current_time, 
            status=SessionStatus.ACTIVE, # Set initial status
        )
        
        # Save to Firestore (convert models to JSON-compatible dicts)
        new_doc_ref.set(session_db.model_dump(mode="json"))
        
        return session_db
    
    except Exception as e:
        print(f"Error starting session: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        

@app.post("/sessions/{session_id}/pause")
def pause_session(session_id: str):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update status to PAUSED
        # We use .value to store the string "paused" instead of the Enum object
        doc_ref.update({"status": SessionStatus.PAUSED.value})
        
        return {"status": "paused", "session_id": session_id}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/sessions/{session_id}/resume")
def resume_session(session_id: str):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update status back to ACTIVE
        doc_ref.update({"status": SessionStatus.ACTIVE.value})
        
        return {"status": "active", "session_id": session_id}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/sessions/{session_id}/end")
def end_session(session_id: str, update_data: SessionUpdate):
    try: 
        doc_ref = db.collection("sessions").document(session_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
        
        end_time = datetime.now(timezone.utc)

        # Base update
        final_update = {
           "status": SessionStatus.COMPLETED.value,
           "end_time": end_time,
        }

        # Add optional fields if they exist in the request
        # We check != None to allow 0 or empty lists if valid
        if update_data.user_focus_rating is not None:
            final_update["user_focus_rating"] = update_data.user_focus_rating
        if update_data.system_focus_score is not None:
            final_update["system_focus_score"] = update_data.system_focus_score
        if update_data.final_duration is not None:
            final_update["final_duration"] = update_data.final_duration
        if update_data.notes:
            final_update["notes"] = update_data.notes
        if update_data.allowed_apps:
            final_update["allowed_apps"] = update_data.allowed_apps
        
        # Note correct spelling: interruption
        if update_data.interruption_events: 
            # Convert list of Pydantic models to list of dicts for Firestore
            events_data = [event.model_dump(mode='json') for event in update_data.interruption_events]
            final_update["interruption_events"] = events_data
            
        if update_data.interruption_count is not None:
            final_update["interruption_count"] = update_data.interruption_count

        doc_ref.update(final_update)
        return {"status": "completed", "session_id": session_id}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error ending session: {e}")
        raise HTTPException(status_code=500, detail=str(e))   
        

@app.get("/sessions/active/{user_id}")
def get_active_session(user_id: str): 
    try: 
        sessions_ref = db.collection("sessions")
        
        # Query: user_id match AND status is Active OR Paused
        # Note: We query the "status" field now, not "session_status"
        query = sessions_ref.where("user_id", "==", user_id).where("status", "in", ["active", "paused"]).limit(1)
        results = query.stream()

        for doc in results:
            data = doc.to_dict()
            # Ensure the ID is returned in the response body
            data["session_id"] = doc.id
            return data 

        # Return explicit None or empty JSON if no session found (handled by frontend 200 check)
        return None 
    except Exception as e:
        print(f"Error fetching active session: {e}")
        raise HTTPException(status_code=500, detail=str(e))