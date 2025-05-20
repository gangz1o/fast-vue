"""
用户相关端点
"""
from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.api.v1.endpoints.auth import oauth2_scheme

router = APIRouter()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    获取当前用户
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await User.filter(username=username).first()
    if user is None:
        raise credentials_exception
    
    return user

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(user_in: UserCreate):
    """
    创建新用户
    """
    # 检查用户名是否已存在
    user = await User.filter(username=user_in.username).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    
    # 检查邮箱是否已存在
    if user_in.email:
        user = await User.filter(email=user_in.email).first()
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )
    
    # 创建新用户
    hashed_password = get_password_hash(user_in.password)
    user = await User.create(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed_password,
    )
    
    return user

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user = Depends(get_current_user)):
    """
    获取当前用户信息
    """
    return current_user
