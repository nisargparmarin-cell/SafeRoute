# Safe-Route Development

## Project Overview
**Safe-Route** is an AI-powered night navigation system that helps drivers find the **safest routes** by avoiding empty, isolated roads and directing them through well-populated areas.

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 14+
- Git

### Quick Start

#### 1. Clone and Setup
```bash
cd safe-route
cp .env.example .env
```

#### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend runs on: http://localhost:5000

#### 3. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

### Project Structure
```
safe-route/
├── frontend/          - React web app
├── backend/           - Flask API
├── ml-models/         - ML models & safety analysis
└── data/              - Crowd-sourced reports
```

### Key Features
- 🗺️ Interactive map interface for route planning
- 🛡️ Safety scoring based on crowd-sourced data
- 🌙 Night-specific route recommendations
- 📊 ML-powered safety prediction
- 👥 Community safety reporting system

### API Endpoints
- `POST /api/routes` - Get safe routes between two locations
- `POST /api/report` - Submit safety report
- `GET /api/route/<id>/safety` - Get route safety score
- `GET /api/hot-zones` - Get unsafe areas

### ML Components
1. **Route Safety Predictor** - ML model for assessing route safety
2. **Crowd-source Analyzer** - Processes user safety reports
3. **Risk Assessment** - Real-time evaluation of routes

### Contributing
This is a research/learning project. Feel free to contribute!

### Future Enhancements
- Computer Vision integration for CCTV analysis
- Real-time traffic API integration (Google Maps, HERE)
- Mobile app versions (iOS/Android)
- Advanced ML models (Deep Learning)
- Database integration (PostgreSQL)
- WebSocket for real-time updates

---
**Created**: 2026
**Status**: Active Development
