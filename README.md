# Safe-Route: Night Navigation Safety System

## 🌙 **Professional Website Demo - Latest Version**

### 🚀 **Major Upgrades Completed:**
- **Ultra-Modern Dark Theme**: Advanced CSS with CSS variables, glassmorphism effects, and sophisticated gradients
- **Enhanced UI/UX**: Professional animations, hover effects, and smooth transitions
- **Interactive Features**: Map controls, legend, time-based routing, and improved forms
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Advanced Animations**: Pulsing safety indicators, glow effects, and micro-interactions

### 🎯 **New Features:**
- **Time-Based Routing**: Select routes optimized for different times (now, night, late-night)
- **Map Controls**: Reset view and toggle safety markers
- **Enhanced Legend**: Professional safety indicators with visual markers
- **Quick Stats**: System metrics and performance indicators
- **Improved Forms**: Better validation and user feedback
- **Advanced Animations**: CSS keyframes for safety score pulsing and glow effects

### 📱 **How to Use:**
1. **Open Demo**: Double-click `safe-route-demo.html`
2. **Enter Route**: Add origin, destination, and preferred time
3. **View Options**: See multiple routes with safety scores
4. **Interactive Map**: Use controls to navigate and explore
5. **Report Issues**: Submit safety reports to improve the system

### 🎨 **Design Highlights:**
- **CSS Variables**: Consistent theming with easy customization
- **Glassmorphism**: Modern frosted glass effects throughout
- **Gradient Animations**: Dynamic color transitions and effects
- **Professional Typography**: Inter font with optimized readability
- **Advanced Shadows**: Multi-layer shadow system for depth

## 🛠️ **Technical Architecture:**

### **CSS Architecture:**
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --bg-glass: rgba(255, 255, 255, 0.03);
  --shadow-glow: 0 0 20px rgba(102, 126, 234, 0.3);
  /* + 15 more design tokens */
}
```

### **Key Features:**
- **Responsive Grid**: CSS Grid and Flexbox for perfect layouts
- **Advanced Animations**: CSS keyframes with cubic-bezier easing
- **Backdrop Filters**: Modern blur effects with browser fallbacks
- **Custom Properties**: Dynamic theming and easy maintenance
- **Performance Optimized**: Hardware-accelerated animations

## 📊 **Safety Scoring System:**

- **🟢 SAFE (80%+)**: Well-lit main roads with high traffic
- **🟡 MODERATE (60-79%)**: Residential areas with street lighting
- **🔴 AVOID (<60%)**: Isolated roads, highways, or dark areas

## 🔧 **Quick Start:**

### **Standalone Demo:**
```bash
# Just open the file
safe-route-demo.html
```

### **Full System:**
```bash
# Start backend
python main.py

# Open website
safe-route-demo.html
```

## 🚀 Professional Website Demo

### Quick Start
1. **Open the Demo**: Double-click `safe-route-demo.html` to launch the professional website
2. **Interactive Features**: Try the route planner, safety markers, and reporting system
3. **Demo Mode**: Works without backend - includes realistic sample data

### Website Features
- **🗺️ Interactive Map**: Real-time route visualization with Leaflet.js
- **🛡️ Safety Scoring**: AI-powered safety assessment (80%+ = Safe, 60-79% = Moderate, <60% = Avoid)
- **📍 Safety Markers**: Visual indicators for safe/unsafe areas across NYC
- **🛣️ Route Comparison**: Multiple route options with detailed safety metrics
- **📝 Safety Reporting**: Community-driven safety reporting system
- **📱 Responsive Design**: Professional UI that works on all devices

## Problem Statement
Night driving poses safety challenges:
- Empty roads are prone to accidents, breakdowns, and lack of assistance
- Isolated areas have limited security and emergency services
- Traditional navigation apps don't prioritize safety; they prioritize speed

**Safe-Route Solution**: Provide intelligent route recommendations that balance safety (populated areas) with reasonable travel time.

### Full System Setup
For complete functionality with API integration:

1. **Start Backend**:
   ```bash
   python main.py
   ```

2. **Open Website**: The HTML demo will automatically connect to the backend API

3. **Test Features**:
   - Route calculation with real safety scoring
   - Safety report submission
   - ML-powered recommendations

## Key Features
1. **Real-time Safety Scoring** - Evaluate road safety based on population density and activity
2. **Crowd-sourced Data** - User reports on accidents, safe/unsafe zones
3. **Route Safety Analysis** - ML models to predict route safety
4. **Night-specific Recommendations** - Different algorithm for night vs. day
5. **Computer Vision Integration** - Monitor road conditions (future)
6. **Interactive Map UI** - React-based map interface

## Project Structure
```
safe-route/
├── frontend/              # React web application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── backend/               # Python Flask API
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   └── __init__.py
│   ├── requirements.txt
│   └── main.py
├── ml-models/             # ML Models & Analysis
│   ├── route_safety_model.py
│   ├── safety_predictor.py
│   └── utils/
├── data/                  # Datasets
│   ├── crowd_reports.json
│   ├── route_data.json
│   └── training_data/
├── README.md
└── .env.example
```

## Tech Stack
- **Frontend**: React, Leaflet/Mapbox (map), Axios (API calls)
- **Backend**: Python 3.9+, Flask/FastAPI, SQLAlchemy
- **ML/AI**: Scikit-learn, TensorFlow/PyTorch, Pandas, NumPy
- **Database**: SQLite (development), PostgreSQL (production)
- **Data Source**: Crowd-sourced user reports

## Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 14+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### ML Model Training
```bash
cd ml-models
python route_safety_model.py
```

## API Endpoints (Planned)
- `POST /api/routes` - Get safe routes
- `POST /api/report` - Submit safety report
- `GET /api/route/{id}/safety` - Get route safety score
- `GET /api/hot-zones` - Get unsafe areas

## ML Components
1. **Route Safety Predictor** - Predicts safety based on historical data
2. **Crowd-source Analyzer** - Processes user reports
3. **Real-time Detection** - Monitors live activity on roads
4. **Computer Vision** (Future) - CCTV feed analysis

## Contributing
This is a research/learning project. Contributions welcome!

## License
MIT License
