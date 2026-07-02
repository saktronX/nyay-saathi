import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# ══════════════════════════════════════════════════════════════════════════════
# User schemas
# ══════════════════════════════════════════════════════════════════════════════

class UserBase(BaseModel):
    name: str
    email: EmailStr
    language_pref: str = "en"


class UserCreate(UserBase):
    password: str  # plain text — hashed in the service layer


class UserRead(UserBase):
    id: int
    created_at: datetime.datetime

    model_config = {"from_attributes": True}


# ══════════════════════════════════════════════════════════════════════════════
# Case schemas
# ══════════════════════════════════════════════════════════════════════════════

class CaseBase(BaseModel):
    problem_text: str
    legal_category: Optional[str] = None
    status: str = "Pending"


class CaseCreate(CaseBase):
    user_id: int


class CaseRead(CaseBase):
    id: int
    user_id: int
    created_at: datetime.datetime

    model_config = {"from_attributes": True}


# ══════════════════════════════════════════════════════════════════════════════
# Document schemas
# ══════════════════════════════════════════════════════════════════════════════

class DocumentBase(BaseModel):
    doc_type: str
    content: Optional[str] = None
    pdf_url: Optional[str] = None


class DocumentCreate(DocumentBase):
    case_id: int


class DocumentRead(DocumentBase):
    id: int
    case_id: int
    created_at: datetime.datetime

    model_config = {"from_attributes": True}


# ══════════════════════════════════════════════════════════════════════════════
# Lawyer schemas
# ══════════════════════════════════════════════════════════════════════════════

class LawyerBase(BaseModel):
    name: str
    city: str
    specialization: Optional[str] = None
    contact: Optional[str] = None
    verified: bool = False


class LawyerCreate(LawyerBase):
    pass


class LawyerRead(LawyerBase):
    id: int

    model_config = {"from_attributes": True}
