#!/bin/bash

# 查找并终止后端服务器进程
echo "正在停止后端服务器..."
pkill -f "uvicorn app.main:app"

# 查找并终止前端服务器进程
echo "正在停止前端服务器..."
pkill -f "vite"

echo "所有服务器已停止。"
