import uuid

from sqlalchemy.orm import Session

from ..database.user import User as DbUser
from ..models.user import UserRequest


class user_repository:

    def fetch_by_id(db: Session, _id):
        return db.query(DbUser).filter(DbUser.id == _id).first()

    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(DbUser).offset(skip).limit(limit).all()

    async def create(db: Session, user: UserRequest):
        db_user = DbUser(name=user.name, highscore=user.highscore, id=str(uuid.uuid1()))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    async def update(db: Session, user):
        updated_user = db.merge(user)
        db.commit()
        return updated_user

    async def delete(db: Session, user_id):
        deleted_user = db.query(DbUser).filter_by(id=user_id).first()
        db.delete(deleted_user)
        db.commit()
