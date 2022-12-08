import uuid

from sqlalchemy import Column, Integer, String

from src.database.db import Base


class User(Base):
    __tablename__ = "user"

    id = Column(String, default=str(uuid.uuid1()), primary_key=True, index=True)
    name = Column(String(80), nullable=False, index=True)
    highscore = Column(Integer, nullable=False)
