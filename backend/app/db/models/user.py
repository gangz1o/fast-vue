"""
用户模型
"""
from tortoise import fields
from tortoise.models import Model


class User(Model):
    """用户模型"""
    
    class Meta:
        table = "users"
    
    id = fields.IntField(pk=True, index=True)
    username = fields.CharField(max_length=255, unique=True, index=True)
    email = fields.CharField(max_length=255, unique=True, index=True, null=True)
    hashed_password = fields.CharField(max_length=255)
    is_active = fields.BooleanField(default=True)
    is_admin = fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
