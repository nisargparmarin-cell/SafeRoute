import React, { useState } from 'react';
import axios from 'axios';

function RouteForm({ onGetRoutes, loading }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/routes', {
        origin,
        destination
      });

      // Transform backend response to match frontend expectations
      const transformedRoutes = response.data.routes.map(route => ({
        ...route,
        name: `Route ${route.id}`,
        safety_score: route.safety_score,
        distance: route.distance || '12.5 km',
        estimated_time: route.estimated_time || '18 min'
      }));

      onGetRoutes(transformedRoutes);
    } catch (err) {
      console.error('Error fetching routes:', err);
      setError('Failed to fetch routes. Please check if backend is running.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="route-form">
      <h2>Find Safe Route</h2>

      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="origin">Starting Location:</label>
        <input
          id="origin"
          type="text"
          placeholder="e.g., Times Square, NYC"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination:</label>
        <input
          id="destination"
          type="text"
          placeholder="e.g., Penn Station, NYC"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Finding Routes...' : 'Get Safe Routes'}
      </button>

      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>💡 Tip:</strong> Safe-Route prioritizes populated areas over empty roads for night driving safety.</p>
      </div>
    </form>
  );
}

export default RouteForm;
