"""API Routes for Safe-Route"""
from flask import Blueprint, request, jsonify
from app.models import SafetyReport, Route, add_report, get_reports
from ml_models.safety_predictor import predict_route_safety

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/routes', methods=['POST'])
def get_routes():
    """Get safe routes between two locations"""
    try:
        data = request.json
        origin = data.get('origin')
        destination = data.get('destination')
        
        if not origin or not destination:
            return jsonify({'error': 'Origin and destination required'}), 400
        
        # Get crowd-sourced safety data
        reports = get_reports()
        
        # Create routes (placeholder - integrate with real routing API)
        routes = [
            Route(origin, destination),
            Route(origin, destination),
        ]
        
        # Score routes using ML model
        for route in routes:
            route.safety_score = predict_route_safety(origin, destination, reports)
        
        return jsonify({
            'origin': origin,
            'destination': destination,
            'routes': [r.to_dict() for r in routes]
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/report', methods=['POST'])
def submit_report():
    """Submit a safety report"""
    try:
        data = request.json
        report = SafetyReport(
            report_type=data.get('reportType'),
            location=data.get('location'),
            description=data.get('description')
        )
        add_report(report)
        return jsonify({'message': 'Report submitted successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/route/<route_id>/safety', methods=['GET'])
def get_route_safety(route_id):
    """Get safety score for a specific route"""
    try:
        # Placeholder - integrate with ML model
        safety_score = 0.85
        return jsonify({
            'route_id': route_id,
            'safety_score': safety_score,
            'risk_level': 'low' if safety_score > 0.7 else 'medium' if safety_score > 0.4 else 'high'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/hot-zones', methods=['GET'])
def get_hot_zones():
    """Get unsafe areas based on crowd-sourced reports"""
    try:
        reports = get_reports()
        unsafe_reports = [r for r in reports if r['report_type'] in ['unsafe_area', 'accident']]
        
        return jsonify({
            'hot_zones': unsafe_reports,
            'total_unsafe_areas': len(unsafe_reports)
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
