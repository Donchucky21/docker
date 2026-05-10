from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import Application, User
from app.schemas.application import ApplicationRead
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.get("/me", response_model=list[ApplicationRead])
def my_applications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    records = (
        db.query(Application)
        .filter(Application.user_id == current_user.id)
        .join(Application.job)
        .order_by(Application.created_at.desc())
        .all()
    )
    return [
        ApplicationRead(
            id=app.id,
            job_id=app.job_id,
            job_title=app.job.title,
            company=app.job.company,
            status=app.status,
            created_at=app.created_at,
        )
        for app in records
    ]
