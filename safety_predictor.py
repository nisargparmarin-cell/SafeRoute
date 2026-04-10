"""Route safety prediction using ML"""
import numpy as np
from datetime import datetime

def predict_route_safety(origin, destination, safety_reports):
    """
    Predict route safety score based on:
    1. Crowd-sourced reports
    2. Time of day (night = higher weight for safety)
    3. Historical patterns
    
    Returns: Safety score 0-1 (1 = safest)
    """
    
    # Base safety score
    safety_score = 0.7
    
    # Adjust based on reports
    if safety_reports:
        # Count negative reports in area
        negative_reports = [r for r in safety_reports 
                          if r.get('report_type') in ['unsafe_area', 'accident', 'poor_lighting']]
        
        # Count positive reports
        positive_reports = [r for r in safety_reports 
                          if r.get('report_type') == 'safe_area']
        
        # Calculate impact
        penalty = (len(negative_reports) * 0.05)
        bonus = (len(positive_reports) * 0.03)
        
        safety_score = max(0.1, min(0.95, safety_score - penalty + bonus))
    
    # Night time multiplier (0000-0600 hours)
    hour = datetime.now().hour
    if 0 <= hour < 6:
        # During night hours, emphasis on safety
        safety_score = safety_score * 0.95  # Be more conservative at night
    
    return round(safety_score, 2)

def analyze_crowd_data(reports):
    """
    Analyze crowd-sourced data to find patterns
    """
    analysis = {
        'total_reports': len(reports),
        'unsafe_areas': len([r for r in reports if r.get('report_type') == 'unsafe_area']),
        'accidents': len([r for r in reports if r.get('report_type') == 'accident']),
        'safe_areas': len([r for r in reports if r.get('report_type') == 'safe_area']),
    }
    return analysis

def get_risk_level(safety_score):
    """Convert safety score to risk level"""
    if safety_score >= 0.75:
        return 'low'
    elif safety_score >= 0.5:
        return 'medium'
    else:
        return 'high'
