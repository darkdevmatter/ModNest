from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User, Server, Backup
from config import Config
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
CORS(app, supports_credentials=True, resources={r"/login": {"origins": Config.CORS_ORIGINS}})

# Create database tables
with app.app_context():
    db.create_all()
    # Create admin user if it doesn't exist
    if not User.query.filter_by(username='admin').first():
        admin = User(username='admin', email='admin@modnest.com', is_admin=True)
        admin.set_password('Welcome123$')
        db.session.add(admin)
        db.session.commit()

# --- Auth Endpoints ---
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight'})
        response.headers.add('Access-Control-Allow-Origin', Config.CORS_ORIGINS[0])
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200

    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    
    if user and user.check_password(data.get('password')):
        res = jsonify({'success': True, 'user': user.to_dict()})
        res.headers.add('Access-Control-Allow-Origin', Config.CORS_ORIGINS[0])
        res.headers.add('Access-Control-Allow-Credentials', 'true')
        return res
    else:
        res = jsonify({'success': False, 'error': 'Invalid credentials'})
        res.headers.add('Access-Control-Allow-Origin', Config.CORS_ORIGINS[0])
        res.headers.add('Access-Control-Allow-Credentials', 'true')
        return res, 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'error': 'Username already exists'}), 400
        
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    user = User(
        username=data.get('username'),
        email=data.get('email')
    )
    user.set_password(data.get('password'))
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'success': True, 'user': user.to_dict()}), 201

@app.route('/user', methods=['GET'])
def get_user():
    # TODO: Implement proper session management
    user = User.query.filter_by(username='admin').first()
    return jsonify(user.to_dict() if user else {'error': 'User not found'}), 200 if user else 404

# --- Server Management ---
@app.route('/api/servers', methods=['GET'])
def list_servers():
    servers = Server.query.all()
    return jsonify({'servers': [server.to_dict() for server in servers]})

@app.route('/api/servers', methods=['POST'])
def create_server():
    data = request.get_json()
    # TODO: Get actual user from session
    user = User.query.filter_by(username='admin').first()
    
    server = Server(
        name=data.get('name'),
        server_type=data.get('type', 'java'),
        version=data.get('version'),
        ip=data.get('ip'),
        port=data.get('port'),
        max_players=data.get('maxPlayers', 20),
        user_id=user.id
    )
    
    db.session.add(server)
    db.session.commit()
    
    return jsonify(server.to_dict()), 201

@app.route('/api/servers/<int:server_id>', methods=['GET'])
def get_server(server_id):
    server = Server.query.get_or_404(server_id)
    return jsonify(server.to_dict())

@app.route('/api/servers/<int:server_id>', methods=['PUT'])
def update_server(server_id):
    server = Server.query.get_or_404(server_id)
    data = request.get_json()
    
    for key, value in data.items():
        if hasattr(server, key):
            setattr(server, key, value)
    
    server.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(server.to_dict())

@app.route('/api/servers/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    server = Server.query.get_or_404(server_id)
    db.session.delete(server)
    db.session.commit()
    return jsonify({'message': 'Server deleted'})

# --- Server Actions ---
@app.route('/api/servers/<int:server_id>/start', methods=['POST'])
def start_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = True
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/servers/<int:server_id>/stop', methods=['POST'])
def stop_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = False
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/servers/<int:server_id>/restart', methods=['POST'])
def restart_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = False
    db.session.commit()
    # Simulate downtime
    import time
    time.sleep(1)
    server.is_running = True
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"success": True})

# --- Server Players ---
@app.route('/api/servers/<server_id>/players', methods=['GET'])
def get_players(server_id):
    # Sample: Return dummy player list (for demo)
    if str(server_id) == "1":
        return jsonify({'players': [{"name": "Steve"}, {"name": "Alex"}]})
    else:
        return jsonify({'players': []})

# --- Server World ---
@app.route('/api/servers/<server_id>/world', methods=['GET'])
def get_world(server_id):
    # TODO: Return world info
    return jsonify({'world': {}})

@app.route('/api/servers/<server_id>/world/download', methods=['GET'])
def download_world(server_id):
    # For now, just return a sample download link (not a real file)
    return jsonify({'url': f'/downloads/world_server_{server_id}.zip', 'message': f'Download world for server {server_id}'})

# --- Server Backups ---

# --- Sample Backups Data ---
SAMPLE_BACKUPS = [
    {"id": "b1", "timestamp": "2025-06-13T21:00:00Z"},
    {"id": "b2", "timestamp": "2025-06-14T03:00:00Z"},
]

@app.route('/api/servers/<server_id>/backups', methods=['GET'])
def list_backups(server_id):
    # Return static backups list for all servers (demo)
    return jsonify({'backups': SAMPLE_BACKUPS})

@app.route('/api/servers/<server_id>/backups', methods=['POST'])
def create_backup(server_id):
    # Simulate a backup being created (append with new id)
    from datetime import datetime
    new_id = f"b{len(SAMPLE_BACKUPS) + 1}"
    now = datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    SAMPLE_BACKUPS.append({"id": new_id, "timestamp": now})
    return jsonify({'message': f'Backup created for server {server_id}', 'backup': SAMPLE_BACKUPS[-1]})

@app.route('/api/servers/<server_id>/backups/<backup_id>/restore', methods=['POST'])
def restore_backup(server_id, backup_id):
    # Simulate a restore
    return jsonify({'message': f'Backup {backup_id} restored for server {server_id}'})

@app.route('/api/servers/<server_id>/backups/<backup_id>/download', methods=['GET'])
def download_backup(server_id, backup_id):
    # Simulate download link
    return jsonify({'url': f'/downloads/backup_{backup_id}_server_{server_id}.zip', 'message': f'Download backup {backup_id} for server {server_id}'})

@app.route('/api/servers/<server_id>/backups/<backup_id>', methods=['DELETE'])
def delete_backup(server_id, backup_id):
    # Simulate backup deletion
    global SAMPLE_BACKUPS
    SAMPLE_BACKUPS = [b for b in SAMPLE_BACKUPS if b["id"] != backup_id]
    return jsonify({'message': f'Backup {backup_id} deleted for server {server_id}'})

# --- Settings ---
@app.route('/api/settings', methods=['GET'])
def get_settings():
    # TODO: Return settings
    return jsonify({'settings': {}})

@app.route('/api/settings', methods=['PUT'])
def update_settings():
    # TODO: Update settings
    return jsonify({'message': 'Settings updated'})

# --- API Endpoints for Frontend POC ---
@app.route('/api/servers', methods=['GET'])
def api_get_servers():
    return jsonify({'servers': Server.query.all()})

@app.route('/api/servers/<int:server_id>/start', methods=['POST'])
def api_start_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = True
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({'success': True, 'message': f'Server {server_id} started'})

@app.route('/api/servers/<int:server_id>/stop', methods=['POST'])
def api_stop_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = False
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({'success': True, 'message': f'Server {server_id} stopped'})

@app.route('/api/servers/<int:server_id>/restart', methods=['POST'])
def api_restart_server(server_id):
    server = Server.query.get_or_404(server_id)
    server.is_running = False
    db.session.commit()
    # Simulate restart
    import time
    time.sleep(0.5)
    server.is_running = True
    server.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({'success': True, 'message': f'Server {server_id} restarted'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)