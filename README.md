# FastAPI + SQLite + Vue 3.5 + Vuetify + TypeScript + Tailwind CSS Template

A full-stack template for quickly building modern web applications.

## Features

### Backend
- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLite**: Lightweight database for local development
- **SQLAlchemy**: SQL toolkit and ORM for Python
- **Pydantic**: Data validation and settings management

### Frontend
- **Vue 3.5**: Progressive JavaScript framework
- **Vuetify**: Material Design component framework
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Pinia**: State management for Vue
- **Vue Router**: Official router for Vue.js

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 16+
- npm or yarn

### Quick Setup (Recommended)

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

### Manual Setup

#### Backend Setup

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

#### Frontend Setup

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

## Project Structure

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

## Development

### Backend

- Add new models in `backend/app/models/`
- Add new schemas in `backend/app/schemas/`
- Add new routes in `backend/app/routes/`

### Frontend

- Add new components in `frontend/src/components/`
- Add new views in `frontend/src/views/`
- Add new stores in `frontend/src/stores/`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
