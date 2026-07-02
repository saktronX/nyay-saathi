import os

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "")

# ── Async engine (Neon.tech requires sslmode=require — included in DATABASE_URL) ──
engine = create_async_engine(
    DATABASE_URL,
    echo=False,          # set to True to log SQL statements during development
    pool_pre_ping=True,  # verify connections before use (important for Neon's serverless)
)

# ── Session factory ──────────────────────────────────────────────────────────
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# ── Base class for all ORM models ────────────────────────────────────────────
class Base(DeclarativeBase):
    pass

# ── Dependency: yields a DB session per request ──────────────────────────────
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
