#!/bin/bash
set -euo pipefail

# Simple local launch helper for webapp
# - Ensures DATABASE_URL exists in .env
# - Kills any server on the chosen port (default 3000)
# - Runs prisma generate + migrate deploy
# - Starts Next.js dev (Turbopack) and tails dev.log

PORT="3000"
NO_KILL="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --port)
      PORT="$2"; shift 2;;
    --no-kill)
      NO_KILL="true"; shift;;
    *)
      echo "Unknown option: $1" >&2; exit 1;;
  esac
done

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# 1) Ensure .env has DATABASE_URL for Prisma CLI
if ! grep -q '^DATABASE_URL=' .env 2>/dev/null; then
  USERNAME="$(whoami)"
  echo "DATABASE_URL=\"postgresql://${USERNAME}@localhost:5432/remind_dev\"" >> .env
  echo "[dev.sh] Wrote default DATABASE_URL to .env"
fi

# 2) Kill any existing server on PORT unless --no-kill
if [[ "$NO_KILL" != "true" ]]; then
  PIDS=$(lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN -t 2>/dev/null || true)
  if [[ -n "$PIDS" ]]; then
    echo "[dev.sh] Killing processes on port ${PORT}: $PIDS"
    for pid in $PIDS; do
      kill "$pid" || true
    done
    sleep 1
  fi
fi

# 3) Prisma client + migrations
pnpm db:generate
pnpm db:migrate:deploy

# 4) Start Next.js dev and capture logs
rm -f .next/dev/lock || true
echo "[dev.sh] Starting Next dev on 127.0.0.1:${PORT} (Turbopack)"
pnpm exec next dev -H 127.0.0.1 -p "${PORT}" > dev.log 2>&1 &
echo $! > .next/dev/next.pid
echo "[dev.sh] Next PID: $(cat .next/dev/next.pid). Logs: webapp/dev.log"

exit 0


