from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8)
    phone: str | None = None
    headline: str | None = None
    location: str | None = None

class UserRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    headline: str | None = None
    location: str | None = None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
