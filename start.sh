#!/bin/bash

# 启动后端
echo "启动后端服务器..."
cd backend
chmod +x start.sh
./start.sh &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端
echo "启动前端服务器..."
cd ../frontend
chmod +x start.sh
./start.sh &
FRONTEND_PID=$!

# 捕获 SIGINT 信号（Ctrl+C）
trap "echo '正在关闭服务器...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# 保持脚本运行
echo "服务器已启动。按 Ctrl+C 停止所有服务器。"
wait
