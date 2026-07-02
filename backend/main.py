from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Nyay Saathi API",
    description="Backend API for Nyay Saathi — AI-powered legal aid platform for Indian citizens.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
# No routes yet — routers will be added here as they are built.
# Example (do not uncomment until routers exist):
#   from backend.routers import users, cases, lawyers
#   app.include_router(users.router, prefix="/api/users", tags=["Users"])
#   app.include_router(cases.router, prefix="/api/cases", tags=["Cases"])
#   app.include_router(lawyers.router, prefix="/api/lawyers", tags=["Lawyers"])

# ── Health check ─────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "service": "Nyay Saathi API", "version": "0.1.0"}
