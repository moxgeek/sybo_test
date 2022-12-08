from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

from src.models.user import UserResponse, UserRequest
from src.repositories.user_repository import user_repository
from sqlalchemy.orm import Session
from fastapi import Depends
from src.database.db import get_db

router = APIRouter(
    prefix="/user",
    tags=["User"],
    responses={404: {"description": " no operation has been specified (add ? update ? get ? ) "}},
)


@router.get('/{user_id}', tags=["User"], response_model=UserResponse, status_code=201)
def get_user(user_id: str, db: Session = Depends(get_db)):
    """
    Get user by id
    """
    db_user = user_repository.fetch_by_id(db=db, _id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="user not found with the given ID")
    return db_user


@router.get('s', tags=["User"], response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    # TODO need to add pagination ...
    """
    Get all users
    """
    return user_repository.fetch_all(db)


@router.post('/', tags=["User"], response_model=UserResponse, status_code=201)
async def create_user(user_request: UserRequest, db: Session = Depends(get_db)):
    """
    Create new user
    """
    return await user_repository.create(db=db, user=user_request)


@router.put('/{user_id}', tags=["User"], response_model=UserResponse, status_code=201)
async def update_user(user_id: str, user_request: UserRequest, db: Session = Depends(get_db)):
    """
    Update user by id
    """
    db_user = get_user(user_id, db)
    if db_user:
        update_item_encoded = jsonable_encoder(user_request)
        db_user.name = update_item_encoded['name']
        db_user.highscore = update_item_encoded['highscore']
        return await user_repository.update(db=db, user=db_user)


@router.delete('/{user_id}', tags=["User"])
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    """
    Delete a user
    """
    db_user = user_repository.fetch_by_id(db=db, _id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="user not found with the given ID")
    await user_repository.delete(db, user_id)
    return "user deleted successfully!"
