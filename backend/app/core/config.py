"""
应用配置
"""
import os
from typing import List, Union
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # 应用信息
    VERSION: str = "0.1.0"
    APP_TITLE: str = "FastAPI Tortoise ORM Template"
    PROJECT_NAME: str = "FastAPI Tortoise ORM Template"
    PROJECT_DESCRIPTION: str = "A template for FastAPI with Tortoise ORM and SQLite"

    # 初始化设置
    INITIALIZE_DB: bool = False

    # CORS 设置
    CORS_ORIGINS: List[str] = ["*"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]

    # 安全设置
    DEBUG: bool = False
    SECRET_KEY: str = "your-secret-key-here"  # 在生产环境中应该使用环境变量
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # 路径设置
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    # 数据库设置
    DB_URL: str = f"sqlite://{BASE_DIR}/db.sqlite3"

    # Tortoise ORM 配置
    TORTOISE_ORM: dict = {
        "connections": {
            "default": {
                "engine": "tortoise.backends.sqlite",
                "credentials": {
                    "file_path": f"{BASE_DIR}/db.sqlite3"
                },
            },
        },
        "apps": {
            "models": {
                "models": ["app.db.models", "aerich.models"],
                "default_connection": "default",
            },
        },
        "use_tz": True,
        "timezone": "UTC",
    }

    # 日期时间格式
    DATETIME_FORMAT: str = "%Y-%m-%d %H:%M:%S"

    class Config:
        env_file = ".env"
        case_sensitive = True

# 创建设置实例
settings = Settings()
