"""
用户相关模式
"""
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """用户基本信息"""
    username: str
    email: Optional[EmailStr] = None
    is_active: bool = True
    is_admin: bool = False


class UserCreate(UserBase):
    """创建用户时的信息"""
    password: str


class UserOut(UserBase):
    """返回给客户端的用户信息"""
    id: int
    
    class Config:
        from_attributes = True
