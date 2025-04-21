#!/bin/bash

echo "Setting up FastAPI + Vue project..."
echo "正在设置 FastAPI + Vue 项目..."

# 检查 Python 3.11 是否可用
if command -v python3.11 &> /dev/null; then
    PYTHON_CMD=python3.11
elif command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 -c 'import sys; print("{}.{}".format(sys.version_info.major, sys.version_info.minor))')
    if [[ "$PYTHON_VERSION" < "3.11" ]]; then
        echo "Warning: Python version $PYTHON_VERSION detected. This project recommends Python 3.11+."
        echo "警告：检测到 Python 版本 $PYTHON_VERSION。此项目推荐使用 Python 3.11+。"
        echo "Continuing with Python $PYTHON_VERSION..."
        echo "继续使用 Python $PYTHON_VERSION..."
    fi
    PYTHON_CMD=python3
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python -c 'import sys; print("{}.{}".format(sys.version_info.major, sys.version_info.minor))')
    if [[ "$PYTHON_VERSION" < "3.11" ]]; then
        echo "Warning: Python version $PYTHON_VERSION detected. This project recommends Python 3.11+."
        echo "警告：检测到 Python 版本 $PYTHON_VERSION。此项目推荐使用 Python 3.11+。"
        echo "Continuing with Python $PYTHON_VERSION..."
        echo "继续使用 Python $PYTHON_VERSION..."
    fi
    PYTHON_CMD=python
else
    echo "Error: Python 3 is not installed. Please install Python 3.11+ and try again."
    echo "错误：未安装 Python 3。请安装 Python 3.11+ 并重试。"
    exit 1
fi

# 设置后端
echo "Setting up backend..."
echo "设置后端..."
cd backend

# 创建 Python 虚拟环境
echo "Creating Python virtual environment..."
echo "创建 Python 虚拟环境..."
$PYTHON_CMD -m venv venv_new
source venv_new/bin/activate

# 安装后端依赖
echo "Installing backend dependencies..."
echo "安装后端依赖..."
pip install -r requirements.txt

# 返回项目根目录
cd ..

# 检查 Node.js 是否可用
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 16+ and try again."
    echo "错误：未安装 Node.js。请安装 Node.js 16+ 并重试。"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [[ "$NODE_VERSION" -lt 16 ]]; then
    echo "Warning: Node.js version $NODE_VERSION detected. This project recommends Node.js 16+."
    echo "警告：检测到 Node.js 版本 $NODE_VERSION。此项目推荐使用 Node.js 16+。"
    echo "Continuing with Node.js $NODE_VERSION..."
    echo "继续使用 Node.js $NODE_VERSION..."
fi

# 设置前端
echo "Setting up frontend..."
echo "设置前端..."
cd frontend

# 安装前端依赖
echo "Installing frontend dependencies..."
echo "安装前端依赖..."
npm install

# 返回项目根目录
cd ..

# 设置脚本权限
echo "Setting script permissions..."
echo "设置脚本权限..."
chmod +x start.sh stop.sh backend/start.sh frontend/start.sh

echo "Setup complete! 设置完成！"
echo "Use './start.sh' to start the project and './stop.sh' to stop it."
echo "使用 './start.sh' 启动项目，使用 './stop.sh' 停止项目。"
