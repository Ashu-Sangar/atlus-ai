from pydantic import BaseModel, Field
from typing import List, Optional
from datatime import datetime
from enum import Enum

# Enums 
class SessionStatus(Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class InteruptionSource(Enum):
    USER = "user_manual"
    SYSTEM = "system_detect"

# Submodels 
class InteruptionEvent(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.now)
    source: InteruptionSource
    duration: Optional[int] = 0
    reason: Optional[str] = None

# Session Model 
class SessionBase(BaseModel):
    user_id: int
    task_id: Optional[int] = None
    intended_duration: int = 25
    notes: Optional[str] = None

    #later fields, specific apps allowed
    allowed_apps: Optional[List[str]] = None
    
class SessionCreate(SessionBase):
    pass

class SessionUpdate(SessionBase):
    status: Optional[SessionStatus] = None
    end_time: Optional[datetime] = None
    final_duration: Optional[int] = None
    user_focus_rating: Optional[int] = Field(None, ge = 1, le=10)
    system_focus_score: Optional[int] = Field(None, ge = 1, le=100)


class SessionDB(SessionBase):
    sessionId: int
    start_time: datetime = Field(default_factory=datetime.now)
    end_time: Optional[datetime] = None
    status: SessionStatus = SessionStatus.ACTIVE
    actual_duration: Optional[int] = 0
    interuption_events: Optional[List[InteruptionEvent]] = []
    interuption_count: Optional[int] = 0
    
    

