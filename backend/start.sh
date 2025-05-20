#!/bin/bash

# 设置 Python 路径
PYTHON_PATH=$(which python3.11)
if [ -z "$PYTHON_PATH" ]; then
    echo "Python 3.11 未找到，尝试使用 python3..."
    PYTHON_PATH=$(which python3)
    if [ -z "$PYTHON_PATH" ]; then
        echo "Python 3 未找到，请安装 Python 3.11 或更高版本"
        exit 1
    fi
fi

echo "使用 Python: $PYTHON_PATH"

# 检查虚拟环境是否存在，如果不存在则创建
VENV_DIR="venv"
if [ ! -d "$VENV_DIR" ]; then
    echo "创建虚拟环境..."
    $PYTHON_PATH -m venv $VENV_DIR
fi

# 激活虚拟环境
source $VENV_DIR/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt

# 启动 FastAPI 服务器
echo "启动 FastAPI 服务器..."
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000