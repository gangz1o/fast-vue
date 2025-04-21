# 🚀 FastAPI + SQLite + Vue 3.5 + Vuetify + TypeScript + Tailwind CSS Template

[English](#english) | [中文](#中文)

<a name="english"></a>
## 🌟 English

A full-stack template for quickly building modern web applications.

### ✨ Features

#### 🔧 Backend
- **FastAPI** 🚀: Modern, fast web framework for building APIs with Python
- **SQLite** 🗃️: Lightweight database for local development
- **SQLAlchemy** 🔄: SQL toolkit and ORM for Python
- **Pydantic** ✅: Data validation and settings management

#### 🎨 Frontend
- **Vue 3.5** 💚: Progressive JavaScript framework
- **Vuetify** 🎭: Material Design component framework
- **TypeScript** 📘: Typed superset of JavaScript
- **Tailwind CSS** 🌊: Utility-first CSS framework
- **Pinia** 🍍: State management for Vue
- **Vue Router** 🧭: Official router for Vue.js
- **i18n** 🌐: Internationalization support (English/Chinese)

<a name="中文"></a>
## 🌟 中文

一个用于快速构建现代 Web 应用程序的全栈模板。

### ✨ 特性

#### 🔧 后端
- **FastAPI** 🚀: 用于构建 Python API 的现代、快速的 Web 框架
- **SQLite** 🗃️: 轻量级本地开发数据库
- **SQLAlchemy** 🔄: Python 的 SQL 工具包和 ORM
- **Pydantic** ✅: 数据验证和设置管理

#### 🎨 前端
- **Vue 3.5** 💚: 渐进式 JavaScript 框架
- **Vuetify** 🎭: Material Design 组件框架
- **TypeScript** 📘: JavaScript 的类型超集
- **Tailwind CSS** 🌊: 实用优先的 CSS 框架
- **Pinia** 🍍: Vue 的状态管理
- **Vue Router** 🧭: Vue.js 的官方路由器
- **i18n** 🌐: 国际化支持（英文/中文）

## 🔬 Getting Started (English)

### 💻 Prerequisites
- Python 3.11+
- Node.js 16+
- npm or yarn

### ⚡ Quick Setup (Recommended)

1. Run the setup script to install all dependencies:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. Start both frontend and backend servers with a single command:
   ```bash
   ./start.sh
   ```

3. Stop all servers when you're done:
   ```bash
   ./stop.sh
   ```

### 📚 Manual Setup

#### 🔧 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python 3.11 virtual environment:
   ```bash
   python3.11 -m venv venv_new
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv_new\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv_new/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI server:
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at http://localhost:8000

   You can access the API documentation at http://localhost:8000/docs

#### 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## 🔬 开始使用 (中文)

### 💻 前提条件
- Python 3.11+
- Node.js 16+
- npm 或 yarn

### ⚡ 快速设置（推荐）

1. 运行设置脚本安装所有依赖项：
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. 使用单个命令启动前端和后端服务器：
   ```bash
   ./start.sh
   ```

3. 完成后停止所有服务器：
   ```bash
   ./stop.sh
   ```

### 📚 手动设置

#### 🔧 后端设置

1. 导航到后端目录：
   ```bash
   cd backend
   ```

2. 创建 Python 3.11 虚拟环境：
   ```bash
   python3.11 -m venv venv_new
   ```

3. 激活虚拟环境：
   - 在 Windows 上：
     ```bash
     venv_new\Scripts\activate
     ```
   - 在 macOS/Linux 上：
     ```bash
     source venv_new/bin/activate
     ```

4. 安装依赖项：
   ```bash
   pip install -r requirements.txt
   ```

5. 运行 FastAPI 服务器：
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   API 将在 http://localhost:8000 上可用

   您可以在 http://localhost:8000/docs 上访问 API 文档

#### 🎨 前端设置

1. 导航到前端目录：
   ```bash
   cd frontend
   ```

2. 安装依赖项：
   ```bash
   npm install
   ```

3. 运行开发服务器：
   ```bash
   npm run dev
   ```

   前端将在 http://localhost:5173 上可用

## 💼 Project Structure (English)

```
fast-vue/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI application
│   │   ├── models/         # SQLite database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routes/         # API routes
│   │   └── database.py     # Database connection
│   ├── requirements.txt    # Python dependencies
│   ├── run.py              # Script to run the server
│   └── start.sh            # Script to start the backend server
├── frontend/               # Vue 3.5 frontend
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Vue components
│   │   ├── views/          # Vue views
│   │   ├── router/         # Vue Router
│   │   ├── stores/         # State management
│   │   ├── i18n/           # Internationalization
│   │   ├── App.vue         # Root component
│   │   └── main.ts         # Entry point
│   ├── public/             # Public assets
│   ├── package.json        # Node dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   ├── vite.config.ts      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── start.sh            # Script to start the frontend server
├── README.md               # Project documentation
├── setup.sh                # Script to set up the entire project
├── start.sh                # Script to start both frontend and backend
└── stop.sh                 # Script to stop all servers
```

## 💼 项目结构 (中文)

```
fast-vue/
├── backend/                # FastAPI 后端
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI 应用
│   │   ├── models/         # SQLite 数据库模型
│   │   ├── schemas/        # Pydantic 模式
│   │   ├── routes/         # API 路由
│   │   └── database.py     # 数据库连接
│   ├── requirements.txt    # Python 依赖项
│   ├── run.py              # 运行服务器的脚本
│   └── start.sh            # 启动后端服务器的脚本
├── frontend/               # Vue 3.5 前端
│   ├── src/
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # Vue 组件
│   │   ├── views/          # Vue 视图
│   │   ├── router/         # Vue 路由器
│   │   ├── stores/         # 状态管理
│   │   ├── i18n/           # 国际化
│   │   ├── App.vue         # 根组件
│   │   └── main.ts         # 入口点
│   ├── public/             # 公共资源
│   ├── package.json        # Node 依赖项
│   ├── tsconfig.json       # TypeScript 配置
│   ├── vite.config.ts      # Vite 配置
│   ├── tailwind.config.js  # Tailwind CSS 配置
│   └── start.sh            # 启动前端服务器的脚本
├── README.md               # 项目文档
├── setup.sh                # 设置整个项目的脚本
├── start.sh                # 同时启动前端和后端的脚本
└── stop.sh                 # 停止所有服务器的脚本
```

## 👷 Development (English)

### 🔧 Backend

- Add new models in `backend/app/models/`
- Add new schemas in `backend/app/schemas/`
- Add new routes in `backend/app/routes/`

### 🎨 Frontend

- Add new components in `frontend/src/components/`
- Add new views in `frontend/src/views/`
- Add new stores in `frontend/src/stores/`
- Modify translations in `frontend/src/i18n/`

## 👷 开发 (中文)

### 🔧 后端

- 在 `backend/app/models/` 中添加新模型
- 在 `backend/app/schemas/` 中添加新模式
- 在 `backend/app/routes/` 中添加新路由

### 🎨 前端

- 在 `frontend/src/components/` 中添加新组件
- 在 `frontend/src/views/` 中添加新视图
- 在 `frontend/src/stores/` 中添加新存储
- 在 `frontend/src/i18n/` 中修改翻译

## 🔐 License

This project is licensed under the MIT License - see the LICENSE file for details.

本项目在 MIT 许可证下授权 - 有关详细信息，请参阅 LICENSE 文件。
