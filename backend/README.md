# FastAPI Tortoise ORM 项目模板

这是一个使用 FastAPI 和 Tortoise ORM 的后端项目模板，使用 SQLite 作为数据库。

## 项目结构

```
.
├── app/                    # 应用包
│   ├── __init__.py         # 应用入口点
│   ├── api/                # API 相关代码
│   │   └── v1/             # API 版本 1
│   │       ├── endpoints/  # API 端点
│   │       └── __init__.py # API 路由
│   ├── core/               # 核心功能
│   │   ├── config.py       # 配置
│   │   ├── db.py           # 数据库初始化
│   │   ├── init_data.py    # 数据初始化
│   │   └── security.py     # 安全相关
│   ├── db/                 # 数据库相关
│   │   └── models/         # 数据模型
│   └── schemas/            # Pydantic 模式
├── .env.example            # 环境变量示例
├── requirements.txt        # 依赖项
└── run.py                  # 启动脚本
```

## 安装

1. 克隆仓库
2. 创建虚拟环境：`python -m venv venv`
3. 激活虚拟环境：
   - Windows: `venv\\Scripts\\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. 安装依赖：`pip install -r requirements.txt`
5. 复制 `.env.example` 到 `.env` 并根据需要修改
6. 首次运行时设置 `INITIALIZE_DB=true` 以初始化数据库

## 运行

```bash
python run.py
```

或者直接使用 uvicorn：

```bash
uvicorn app:app --reload
```

## API 文档

启动应用后，可以在以下地址访问 API 文档：

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 数据库迁移

本项目使用 Aerich 进行数据库迁移：

```bash
# 初始化 Aerich
aerich init -t app.core.config.settings.TORTOISE_ORM

# 创建迁移
aerich migrate

# 应用迁移
aerich upgrade
```
