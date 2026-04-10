import React, { useState } from 'react';
import axios from 'axios';

function SafetyReport({ onSubmit }) {
  const [reportType, setReportType] = useState('unsafe_area');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setMessage('Please describe the safety issue');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/report', {
        reportType,
        location: location || 'Current location',
        description
      });

      setMessage('✅ Report submitted successfully! Thank you for helping make roads safer.');
      setDescription('');
      setLocation('');

      // Call parent callback if provided
      if (onSubmit) {
        onSubmit({
          reportType,
          location: location || 'Current location',
          description
        });
      }
    } catch (err) {
      console.error('Error submitting report:', err);
      setMessage('❌ Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="safety-report">
      <h2>Report Safety Issue</h2>

      {message && (
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          background: message.includes('✅') ? '#e8f5e8' : '#ffebee',
          color: message.includes('✅') ? '#2e7d32' : '#c62828'
        }}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="report-type">Report Type:</label>
        <select
          id="report-type"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="unsafe_area">🚫 Unsafe Area</option>
          <option value="accident">🚨 Accident</option>
          <option value="breakdown">🔧 Vehicle Breakdown</option>
          <option value="poor_lighting">💡 Poor Lighting</option>
          <option value="safe_area">✅ Safe Area</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location (optional):</label>
        <input
          id="location"
          type="text"
          placeholder="e.g., Near Times Square"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Describe the safety issue or positive experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Report'}
      </button>

      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
        <p>Your reports help improve safety for everyone! 📊</p>
      </div>
    </form>
  );
}

export default SafetyReport;
