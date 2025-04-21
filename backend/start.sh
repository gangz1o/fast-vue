#!/bin/bash

# 激活 Python 3.11 虚拟环境
source venv_new/bin/activate

# 启动 FastAPI 服务器
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
