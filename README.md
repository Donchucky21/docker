# TalentBridge App Docker Setup

This package contains the updated frontend theme, a frontend Dockerfile, a backend Dockerfile, and one root `docker-compose.yml` that starts the services in this order:

1. PostgreSQL database
2. FastAPI backend after the database is healthy
3. React frontend after the backend is healthy

## Run everything

From this folder:

```bash
docker compose up --build
```

## Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Stop everything

```bash
docker compose down
```

To remove the database volume as well:

```bash
docker compose down -v
```

## Notes

- PostgreSQL creates the `job_portal` database automatically using `POSTGRES_DB`.
- The backend runs `python scripts/init_db.py` before starting the API, so tables and demo jobs are created automatically.
- The frontend is built with `VITE_API_BASE_URL=http://localhost:8000/api/v1`, so the browser can reach the backend from your machine.
