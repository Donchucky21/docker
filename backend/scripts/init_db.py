from app.db.session import Base, engine, SessionLocal
from app.models import Job

DEMO_JOBS = [
    {
        "title": "Junior Cloud Engineer",
        "company": "CloudNova Solutions",
        "location": "London, UK / Hybrid",
        "job_type": "Full-time",
        "salary_range": "£35,000 - £45,000",
        "summary": "Support cloud infrastructure operations, deployments, monitoring, and incident response.",
        "description": "You will work with senior engineers to deploy cloud resources, maintain CI/CD pipelines, monitor systems, and improve reliability across production services.",
        "requirements": "Basic AWS knowledge, Linux fundamentals, Git, scripting experience, and willingness to learn Terraform and Kubernetes.",
    },
    {
        "title": "Python Backend Developer",
        "company": "TalentWorks Digital",
        "location": "Manchester, UK / Remote",
        "job_type": "Full-time",
        "salary_range": "£45,000 - £60,000",
        "summary": "Build reliable APIs and backend services for a growing digital hiring platform.",
        "description": "You will design REST APIs, integrate PostgreSQL databases, implement authentication, and collaborate with frontend engineers to ship user-focused products.",
        "requirements": "Python, FastAPI or Django, PostgreSQL, API design, testing, Docker, and good communication skills.",
    },
    {
        "title": "Frontend React Engineer",
        "company": "BridgeHire Labs",
        "location": "Birmingham, UK",
        "job_type": "Contract",
        "salary_range": "£350 - £450/day",
        "summary": "Create polished user interfaces for applicant and recruiter workflows.",
        "description": "You will build responsive React screens, connect frontend components to APIs, and improve the job search and application experience.",
        "requirements": "React, JavaScript, CSS, API integration, accessibility awareness, and experience with component-based design.",
    },
]

def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Job).count() == 0:
            for item in DEMO_JOBS:
                db.add(Job(**item))
            db.commit()
            print("Database initialized and demo jobs created.")
        else:
            print("Database already contains jobs. No seed data added.")
    finally:
        db.close()

if __name__ == "__main__":
    main()
