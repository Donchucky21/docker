from datetime import datetime
from pydantic import BaseModel, HttpUrl

class ApplicationCreate(BaseModel):
    cover_note: str
    cv_url: HttpUrl

class ApplicationRead(BaseModel):
    id: int
    job_id: int
    job_title: str
    company: str
    status: str
    created_at: datetime

class ApplicationDetailRead(ApplicationRead):
    cover_note: str
    cv_url: str
