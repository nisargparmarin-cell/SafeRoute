"""Route Safety ML Model Training and Evaluation"""
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import json
import os

class RouteSafetyModel:
    """ML model for predicting route safety"""
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def prepare_training_data(self, reports_data):
        """
        Prepare training data from crowd-sourced reports
        Features: population_density, lighting_quality, accident_history, time_of_day
        """
        features = []
        labels = []
        
        for report in reports_data:
            # Extract features (placeholder - integrate with real data)
            feature_vector = [
                0.5,  # population_density (0-1)
                0.6,  # lighting_quality (0-1)
                0.3,  # accident_history (count)
                12,   # time_of_day (0-23)
            ]
            
            # Label: 1 = safe, 0 = unsafe
            label = 1 if report.get('report_type') == 'safe_area' else 0
            
            features.append(feature_vector)
            labels.append(label)
        
        return np.array(features), np.array(labels)
    
    def train(self, X, y):
        """Train the ML model"""
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True
        print("Model trained successfully!")
    
    def predict(self, features):
        """Predict safety for given features"""
        if not self.is_trained:
            raise ValueError("Model must be trained first")
        
        features_scaled = self.scaler.transform([features])
        prediction = self.model.predict_proba(features_scaled)[0]
        return prediction[1]  # Probability of being safe

def load_training_data(data_path='./data/crowd_reports.json'):
    """Load training data from crowd reports"""
    try:
        with open(data_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

if __name__ == '__main__':
    # Training script
    print("Training Route Safety ML Model...")
    
    model = RouteSafetyModel()
    training_data = load_training_data()
    
    if training_data:
        X, y = model.prepare_training_data(training_data)
        model.train(X, y)
        
        # Test prediction
        test_features = [0.7, 0.8, 0.1, 22]  # High pop, good lighting, low accidents, 10 PM
        safety_prob = model.predict(test_features)
        print(f"Test route safety probability: {safety_prob:.2f}")
    else:
        print("No training data available. Model ready for training once data is collected.")
