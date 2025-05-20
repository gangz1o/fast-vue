"""
数据库初始化
"""
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
import logging

from .config import settings

logger = logging.getLogger(__name__)

def init_db(app: FastAPI) -> None:
    """
    初始化 Tortoise ORM
    
    参数:
        app: FastAPI 应用实例
    
    该函数将:
    1. 注册 Tortoise ORM 到 FastAPI 应用
    2. 自动创建数据库表结构（如果不存在）
    3. 添加异常处理程序
    """
    try:
        register_tortoise(
            app,
            config=settings.TORTOISE_ORM,
            generate_schemas=True,  # 自动创建表，生产环境建议使用 Aerich 进行迁移
            add_exception_handlers=True,
        )
        logger.info("Tortoise ORM initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Tortoise ORM: {e}")
        raise
