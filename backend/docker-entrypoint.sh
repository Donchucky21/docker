#!/bin/sh
set -e

python - <<'PY'
import os
import time
from sqlalchemy import create_engine, text

url = os.environ["DATABASE_URL"]

for attempt in range(1, 31):
    try:
        engine = create_engine(url, pool_pre_ping=True)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("Database connection is ready.")
        break
    except Exception as exc:
        print(f"Waiting for database... attempt {attempt}/30: {exc}")
        time.sleep(2)
else:
    raise SystemExit("Database did not become ready in time.")
PY

python scripts/init_db.py

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
