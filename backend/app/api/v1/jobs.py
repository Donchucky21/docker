from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.db.session import get_db
from app.models import Application, Job, User
from app.schemas.application import ApplicationCreate, ApplicationDetailRead
from app.schemas.job import JobRead
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("", response_model=list[JobRead])
def list_jobs(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Job).filter(Job.is_active == True).order_by(Job.created_at.desc()).all()

@router.get("/{job_id}", response_model=JobRead)
def get_job(job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    job = db.query(Job).filter(Job.id == job_id, Job.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/{job_id}/apply", response_model=ApplicationDetailRead, status_code=status.HTTP_201_CREATED)
def apply_for_job(job_id: int, payload: ApplicationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    job = db.query(Job).filter(Job.id == job_id, Job.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    application = Application(user_id=current_user.id, job_id=job.id, cover_note=payload.cover_note, cv_url=str(payload.cv_url))
    db.add(application)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="You have already applied for this job")
    db.refresh(application)
    return ApplicationDetailRead(
        id=application.id,
        job_id=job.id,
        job_title=job.title,
        company=job.company,
        status=application.status,
        created_at=application.created_at,
        cover_note=application.cover_note,
        cv_url=application.cv_url,
    )
