"""Database models for Safe-Route"""
import json
import os
from datetime import datetime

DATA_DIR = './data'

def init_db():
    """Initialize database files"""
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Initialize crowd reports if not exist
    reports_file = os.path.join(DATA_DIR, 'crowd_reports.json')
    if not os.path.exists(reports_file):
        with open(reports_file, 'w') as f:
            json.dump([], f)
    
    # Initialize route data if not exist
    routes_file = os.path.join(DATA_DIR, 'route_data.json')
    if not os.path.exists(routes_file):
        with open(routes_file, 'w') as f:
            json.dump({}, f)

class SafetyReport:
    """Model for safety reports"""
    def __init__(self, report_type, location, description, timestamp=None):
        self.report_type = report_type
        self.location = location
        self.description = description
        self.timestamp = timestamp or datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'report_type': self.report_type,
            'location': self.location,
            'description': self.description,
            'timestamp': self.timestamp
        }

class Route:
    """Model for route information"""
    def __init__(self, origin, destination, route_id=None):
        self.id = route_id
        self.origin = origin
        self.destination = destination
        self.safety_score = 0.0
        self.distance = 0.0
        self.estimated_time = 0
    
    def to_dict(self):
        return {
            'id': self.id,
            'origin': self.origin,
            'destination': self.destination,
            'safety_score': self.safety_score,
            'distance': self.distance,
            'estimated_time': self.estimated_time
        }

def add_report(report):
    """Add a safety report"""
    reports_file = os.path.join(DATA_DIR, 'crowd_reports.json')
    with open(reports_file, 'r') as f:
        reports = json.load(f)
    
    reports.append(report.to_dict())
    
    with open(reports_file, 'w') as f:
        json.dump(reports, f, indent=2)

def get_reports():
    """Get all safety reports"""
    reports_file = os.path.join(DATA_DIR, 'crowd_reports.json')
    with open(reports_file, 'r') as f:
        return json.load(f)
