#!/bin/bash

echo "设置 FastAPI + Vue 项目..."

# 设置后端
echo "设置后端..."
cd backend

# 创建 Python 3.11 虚拟环境
echo "创建 Python 3.11 虚拟环境..."
/opt/homebrew/opt/python@3.11/bin/python3.11 -m venv venv_new
source venv_new/bin/activate

# 安装后端依赖
echo "安装后端依赖..."
pip install -r requirements.txt

# 返回项目根目录
cd ..

# 设置前端
echo "设置前端..."
cd frontend

# 安装前端依赖
echo "安装前端依赖..."
npm install

# 返回项目根目录
cd ..

# 设置脚本权限
chmod +x start.sh stop.sh backend/start.sh frontend/start.sh

echo "设置完成！"
echo "使用 './start.sh' 启动项目，使用 './stop.sh' 停止项目。"
