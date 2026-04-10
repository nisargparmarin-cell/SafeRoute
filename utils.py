"""Utility functions for ML models"""
import numpy as np
from geopy.distance import geodesic

def calculate_population_density(location_data):
    """Calculate population density for a location"""
    # Placeholder - would connect to real data API
    return np.random.uniform(0, 1)

def get_lighting_quality(location, time_of_night):
    """Evaluate street lighting quality"""
    # Placeholder - would use street mapping data
    base_quality = 0.6
    if time_of_night > 22 or time_of_night < 5:
        return base_quality * 0.7  # Reduced visibility during deep night
    return base_quality

def calculate_distance(origin_coords, dest_coords):
    """Calculate distance between two coordinates"""
    return geodesic(origin_coords, dest_coords).km

def normalize_score(score, min_val=0, max_val=1):
    """Normalize score to range [0, 1]"""
    return (score - min_val) / (max_val - min_val)
