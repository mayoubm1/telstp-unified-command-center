from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import json
import time
from datetime import datetime, timedelta

command_center_bp = Blueprint('command_center', __name__)

# Mock data for demonstration
components_data = [
    {
        'id': 'omnicognitor',
        'name': 'OmniCognitor',
        'status': 'online',
        'type': 'chat',
        'lastSeen': '2 min ago',
        'url': 'https://omnicognitor.vercel.app',
        'health': 98,
        'requests_per_hour': 234
    },
    {
        'id': 'ai-agent-dev',
        'name': 'AI Agent Development',
        'status': 'online',
        'type': 'agent',
        'lastSeen': '1 min ago',
        'url': 'https://ai-agent-dev.netlify.app',
        'health': 95,
        'requests_per_hour': 156
    },
    {
        'id': 'wellness-companion',
        'name': 'Personal Wellness Companion',
        'status': 'online',
        'type': 'wellness',
        'lastSeen': '3 min ago',
        'url': 'https://wellness-companion.vercel.app',
        'health': 97,
        'requests_per_hour': 89
    },
    {
        'id': 'm2-3m-portal',
        'name': 'M2-3M Research Portal',
        'status': 'pending',
        'type': 'research',
        'lastSeen': '10 min ago',
        'url': None,
        'health': 0,
        'requests_per_hour': 0
    },
    {
        'id': 'telemedicine-hub',
        'name': 'Telemedicine Hub',
        'status': 'pending',
        'type': 'medical',
        'lastSeen': '15 min ago',
        'url': None,
        'health': 0,
        'requests_per_hour': 0
    }
]

ai_services_data = [
    {
        'name': 'OpenAI',
        'status': 'active',
        'requests_per_hour': 234,
        'response_time': 145,
        'cost_per_hour': 2.45
    },
    {
        'name': 'Anthropic Claude',
        'status': 'active',
        'requests_per_hour': 156,
        'response_time': 167,
        'cost_per_hour': 1.89
    },
    {
        'name': 'Google Gemini',
        'status': 'active',
        'requests_per_hour': 89,
        'response_time': 134,
        'cost_per_hour': 0.67
    }
]

migration_status_data = [
    {
        'component': 'OmniCognitor Frontend',
        'target': 'Vercel',
        'progress': 100,
        'status': 'Complete'
    },
    {
        'component': 'OmniCognitor Backend',
        'target': 'Railway',
        'progress': 100,
        'status': 'Complete'
    },
    {
        'component': 'AI Agent Development',
        'target': 'Netlify',
        'progress': 75,
        'status': 'In Progress'
    },
    {
        'component': 'Wellness Companion',
        'target': 'Vercel',
        'progress': 60,
        'status': 'In Progress'
    },
    {
        'component': 'M2-3M Research Portal',
        'target': 'Firebase',
        'progress': 0,
        'status': 'Pending'
    }
]

@command_center_bp.route('/status', methods=['GET'])
@cross_origin()
def get_system_status():
    """Get overall system status"""
    online_components = len([c for c in components_data if c['status'] == 'online'])
    total_components = len(components_data)
    
    system_status = 'operational' if online_components >= total_components * 0.8 else 'degraded'
    
    return jsonify({
        'status': system_status,
        'online_components': online_components,
        'total_components': total_components,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/components', methods=['GET'])
@cross_origin()
def get_components():
    """Get all connected components"""
    return jsonify({
        'components': components_data,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/components/<component_id>', methods=['GET'])
@cross_origin()
def get_component(component_id):
    """Get specific component details"""
    component = next((c for c in components_data if c['id'] == component_id), None)
    if not component:
        return jsonify({'error': 'Component not found'}), 404
    
    return jsonify({
        'component': component,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/components/<component_id>/health', methods=['POST'])
@cross_origin()
def update_component_health(component_id):
    """Update component health status"""
    data = request.get_json()
    component = next((c for c in components_data if c['id'] == component_id), None)
    
    if not component:
        return jsonify({'error': 'Component not found'}), 404
    
    if 'status' in data:
        component['status'] = data['status']
    if 'health' in data:
        component['health'] = data['health']
    
    component['lastSeen'] = 'Just now'
    
    return jsonify({
        'message': 'Component health updated',
        'component': component
    })

@command_center_bp.route('/metrics', methods=['GET'])
@cross_origin()
def get_metrics():
    """Get system metrics"""
    total_requests = sum(c['requests_per_hour'] for c in components_data)
    active_users = 23  # Mock data
    avg_response_time = sum(s['response_time'] for s in ai_services_data) / len(ai_services_data)
    uptime = 99.8  # Mock data
    
    return jsonify({
        'total_requests': total_requests,
        'active_users': active_users,
        'response_time': round(avg_response_time),
        'uptime': uptime,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/ai-services', methods=['GET'])
@cross_origin()
def get_ai_services():
    """Get AI service integrations status"""
    return jsonify({
        'services': ai_services_data,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/migration-status', methods=['GET'])
@cross_origin()
def get_migration_status():
    """Get migration progress"""
    return jsonify({
        'migrations': migration_status_data,
        'overall_progress': sum(m['progress'] for m in migration_status_data) / len(migration_status_data),
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/alerts', methods=['GET'])
@cross_origin()
def get_alerts():
    """Get system alerts"""
    alerts = [
        {
            'id': 1,
            'type': 'success',
            'title': 'Migration Complete',
            'message': 'OmniCognitor successfully migrated to Vercel',
            'timestamp': (datetime.now() - timedelta(minutes=5)).isoformat()
        },
        {
            'id': 2,
            'type': 'info',
            'title': 'Pending Migration',
            'message': 'M2-3M Research Portal deployment in progress',
            'timestamp': (datetime.now() - timedelta(minutes=15)).isoformat()
        }
    ]
    
    return jsonify({
        'alerts': alerts,
        'timestamp': datetime.now().isoformat()
    })

@command_center_bp.route('/execute-command', methods=['POST'])
@cross_origin()
def execute_command():
    """Execute CLI command on component"""
    data = request.get_json()
    component_id = data.get('component_id')
    command = data.get('command')
    
    if not component_id or not command:
        return jsonify({'error': 'Missing component_id or command'}), 400
    
    component = next((c for c in components_data if c['id'] == component_id), None)
    if not component:
        return jsonify({'error': 'Component not found'}), 404
    
    # Mock command execution
    result = {
        'component_id': component_id,
        'command': command,
        'output': f'Command "{command}" executed successfully on {component["name"]}',
        'exit_code': 0,
        'timestamp': datetime.now().isoformat()
    }
    
    return jsonify(result)

@command_center_bp.route('/websocket-test', methods=['GET'])
@cross_origin()
def websocket_test():
    """Test WebSocket connectivity"""
    return jsonify({
        'message': 'WebSocket endpoint ready',
        'timestamp': datetime.now().isoformat()
    })

