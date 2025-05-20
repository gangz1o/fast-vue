"""
令牌相关模式
"""
from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    """访问令牌"""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """令牌数据"""
    username: Optional[str] = None
