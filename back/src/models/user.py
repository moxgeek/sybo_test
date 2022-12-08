import uuid
from typing import Optional

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    name: str = Field(
        None, title="name", description='full name must be larger than 5 chars', max_length=80, min_length=5
    )
    highscore: float = Field(..., gt=0,
                             description="The score must be greater than zero")


class UserRequest(UserBase):
    pass


class UserResponse(UserBase):
    id: Optional[str] = uuid.uuid1()

    class Config:
        orm_mode = True
