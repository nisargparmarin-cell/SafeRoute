#!/usr/bin/env python3
"""
Safe-Route Backend API
Night navigation safety system using AI/ML
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from app.routes import api_routes
from app.models import init_db
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['DEBUG'] = os.getenv('DEBUG', True)
app.config['JSON_SORT_KEYS'] = False

# Initialize database
init_db()

# Register routes
app.register_blueprint(api_routes.bp)

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'safe-route-api'}), 200

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': str(error)}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
