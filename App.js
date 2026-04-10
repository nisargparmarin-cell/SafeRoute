import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RouteForm from './components/RouteForm';
import SafetyReport from './components/SafetyReport';
import './App.css';

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetRoutes = (fetchedRoutes) => {
    setRoutes(fetchedRoutes);
    setSelectedRoute(fetchedRoutes[0]); // Auto-select the safest route
  };

  const handleReportSafety = async (reportData) => {
    try {
      const response = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      const data = await response.json();
      console.log('Report submitted:', data);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌙 Safe-Route: Night Navigation</h1>
        <p>Your safest route for night driving</p>
      </header>
      
      <div className="app-container">
        <aside className="sidebar">
          <RouteForm onGetRoutes={handleGetRoutes} loading={loading} />
          <SafetyReport onSubmit={handleReportSafety} />

          {routes.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Available Routes</h3>
              {routes.map((route, index) => (
                <div
                  key={route.id || index}
                  style={{
                    padding: '1rem',
                    margin: '0.5rem 0',
                    borderRadius: '8px',
                    background: selectedRoute?.id === route.id ? '#e3f2fd' : '#f5f5f5',
                    border: selectedRoute?.id === route.id ? '2px solid #2196f3' : '1px solid #ddd',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedRoute(route)}
                >
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{route.name}</h4>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Safety:</strong> {(route.safety_score * 100).toFixed(0)}%
                    <span style={{
                      display: 'inline-block',
                      marginLeft: '0.5rem',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      background: route.safety_score > 0.7 ? '#4caf50' : route.safety_score > 0.5 ? '#ff9800' : '#f44336',
                      color: 'white'
                    }}>
                      {route.safety_score > 0.7 ? 'SAFE' : route.safety_score > 0.5 ? 'MODERATE' : 'AVOID'}
                    </span>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Distance:</strong> {route.distance}
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    <strong>Time:</strong> {route.estimated_time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </aside>
        
        <main className="map-container">
          <MapComponent routes={routes} selectedRoute={selectedRoute} />
        </main>
      </div>
    </div>
  );
}

export default App;
