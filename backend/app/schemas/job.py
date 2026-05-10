from datetime import datetime
from pydantic import BaseModel

class JobRead(BaseModel):
    id: int
    title: str
    company: str
    location: str
    job_type: str
    salary_range: str | None = None
    summary: str
    description: str
    requirements: str
    created_at: datetime

    model_config = {"from_attributes": True}
