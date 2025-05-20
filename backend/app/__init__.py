"""
应用入口点
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .core.config import settings
from .core.db import init_db
from .api.v1 import api_router

# 创建 FastAPI 应用
app = FastAPI(
    title=settings.APP_TITLE,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# 包含路由
app.include_router(api_router, prefix="/api")

# 初始化 Tortoise ORM
init_db(app)

# 应用启动时执行的事件
@app.on_event("startup")
async def startup_event():
    # 只在配置中设置了 INITIALIZE_DB=True 时初始化数据
    if settings.INITIALIZE_DB:
        from .core.init_data import create_initial_data
        await create_initial_data()
        print("Database initialized with initial data")
