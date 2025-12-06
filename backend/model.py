from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime # Fixed typo: datatime -> datetime
from enum import Enum

# --- Enums ---
class SessionStatus(Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class InterruptionSource(Enum): # Fixed typo: Interuption -> Interruption
    USER = "user_manual"
    SYSTEM = "system_detect"

# --- Submodels ---
class InterruptionEvent(BaseModel): # Fixed typo: Interuption -> Interruption
    timestamp: datetime = Field(default_factory=datetime.now)
    source: InterruptionSource
    duration: Optional[int] = 0
    reason: Optional[str] = None

# --- Session Models ---

class SessionBase(BaseModel):
    user_id: str  # Changed int -> str (Frontend sends string IDs)
    task_id: Optional[str] = None # Changed int -> str (Usually task IDs are strings too)
    intended_duration: int = 25
    notes: Optional[str] = None
    allowed_apps: Optional[List[str]] = None
    
class SessionCreate(SessionBase):
    pass

# STOPPED inheriting from SessionBase to make fields optional
class SessionUpdate(BaseModel):
    status: Optional[SessionStatus] = None
    end_time: Optional[datetime] = None
    final_duration: Optional[int] = None
    user_focus_rating: Optional[int] = Field(None, ge=1, le=10)
    system_focus_score: Optional[int] = Field(None, ge=1, le=100)
    notes: Optional[str] = None
    allowed_apps: Optional[List[str]] = None
    # Added these to match your backend logic
    interruption_events: Optional[List[InterruptionEvent]] = None 
    interruption_count: Optional[int] = None

class SessionDB(SessionBase):
    session_id: str # Changed int -> str (Firestore IDs are strings)
    start_time: datetime = Field(default_factory=datetime.now)
    end_time: Optional[datetime] = None
    status: SessionStatus = SessionStatus.ACTIVE
    actual_duration: Optional[int] = 0
    interruption_events: Optional[List[InterruptionEvent]] = [] # Fixed typo
    interruption_count: Optional[int] = 0 # Fixed typo