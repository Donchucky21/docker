# TalentBridge Job Portal Backend

FastAPI backend for a professional three-tier job portal application.

## Features

- Applicant registration and login
- JWT authentication
- Protected API endpoints
- PostgreSQL database via SQLAlchemy
- Job listing, job details, job applications
- Applicant application history
- Seed script for demo jobs
- Docker Compose for local PostgreSQL

## Getting Started

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d
```

Create tables and seed jobs:

```bash
python scripts/init_db.py
```

Run API:

```bash
uvicorn app.main:app --reload
```

API docs: `http://localhost:8000/docs`
