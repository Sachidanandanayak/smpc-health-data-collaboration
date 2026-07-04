# SMPC Health Data Collaboration

Secure Multi-Party Computation (SMPC) platform for healthcare data. This project enables multiple hospitals or healthcare providers to perform collaborative data analytics and machine learning without sharing raw, sensitive patient data.

## Project Structure

The project is structured as a full-stack application:

- **`backend/`**: FastAPI-based Python backend. Handles the API requests, user authentication, dataset management, and the core SMPC services/computation orchestration.
- **Frontend (Root)**: React application built with Vite and Tailwind CSS. Provides the user interface for hospitals to upload datasets, initiate computations, and view analytic results.

## Technologies Used

### Backend
- **Framework**: FastAPI (Python)
- **Database Migrations**: Alembic
- **Deployment**: Docker & Docker Compose
- **Key Modules**: Authentication, SMPC services, Machine Learning services, Audit logging.

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts

## Getting Started

### Prerequisites
- Python 3.9+ (for backend)
- Node.js (for frontend)
- Docker and Docker Compose (optional, for backend containerization)

### 1. Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
```

**Option A: Local Development**
1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
2. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the database by running Alembic migrations (ensure you have configured your database URL in `.env` or `alembic.ini`):
   ```bash
   alembic upgrade head
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

**Option B: Docker Setup**
1. Simply run docker-compose from the `backend` folder:
   ```bash
   docker-compose up --build
   ```

### 2. Frontend Setup

Navigate back to the project root directory where the `package.json` is located.

1. Install the NPM packages:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the local URL provided by Vite (typically `http://localhost:5173`).

## Contributing

1. Create a feature branch (`git checkout -b feature/my-feature`).
2. Commit your changes (`git commit -m 'Add some feature'`).
3. Push to the branch (`git push origin feature/my-feature`).
4. Open a Pull Request.

## License

This project is licensed under the MIT License.
