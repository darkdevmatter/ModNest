from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
CORS(
    app,
    supports_credentials=True,
    resources={r"/login": {"origins": "http://localhost:3000"}}
)

# --- Sample Data (for development) ---
SERVERS = [
    {
        "id": 1,
        "name": "My Survival Server",
        "running": True,
        "type": "Bedrock Edition",
        "players": 5,
        "maxPlayers": 20,
        "ip": "192.168.1.10:19132",
        "isAdmin": True,
        "mcsmUrl": "http://localhost:24444",
    },
    {
        "id": 2,
        "name": "Modded Java Server",
        "running": False,
        "type": "Java Edition",
        "players": 0,
        "maxPlayers": 10,
        "ip": "192.168.1.11:25565",
        "isAdmin": False,
        "mcsmUrl": "",
    },
]
CURRENT_USER = {"username": "Steve"}

# CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})

# --- Auth Endpoints ---
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Reply OK to preflight request
        response = jsonify({'message': 'CORS preflight'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200

    data = request.get_json()
    print(data)
    # Temp
    username = data.get('username')
    password = data.get('password')
    if username == 'admin' and password == 'password':
        res = jsonify({'success': True, 'user': username})
        res.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.headers.add('Access-Control-Allow-Credentials', 'true')
        return res
    else:
        res = jsonify({'success': False, 'error': 'Invalid credentials'})
        res.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.headers.add('Access-Control-Allow-Credentials', 'true')
        return res, 401

@app.route('/signup', methods=['POST'])
def signup():
    # TODO: Implement signup logic
    return jsonify({'message': 'Signup endpoint'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    # TODO: Implement logout logic
    return jsonify({'message': 'Logout endpoint'}), 200

# --- User Endpoint ---
@app.route('/user', methods=['GET'])
def get_user():
    return jsonify(CURRENT_USER)

# --- Server List/Creation ---
@app.route('/servers', methods=['GET'])
def list_servers():
    return jsonify({'servers': SERVERS})

@app.route('/servers', methods=['POST'])
def create_server():
    # TODO: Create a new server
    return jsonify({'message': 'Server created'}), 201

# --- Individual Server ---
@app.route('/servers/<server_id>', methods=['GET'])
def get_server(server_id):
    # TODO: Return server info
    return jsonify({'server_id': server_id})

@app.route('/servers/<server_id>', methods=['PUT'])
def update_server(server_id):
    # TODO: Update server info
    return jsonify({'message': f'Server {server_id} updated'})

@app.route('/servers/<server_id>', methods=['DELETE'])
def delete_server(server_id):
    # TODO: Delete server
    return jsonify({'message': f'Server {server_id} deleted'})

# --- Server Actions ---
@app.route('/servers/<int:server_id>/start', methods=['POST'])
def start_server(server_id):
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = True
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/servers/<int:server_id>/stop', methods=['POST'])
def stop_server(server_id):
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = False
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/servers/<int:server_id>/restart', methods=['POST'])
def restart_server(server_id):
    import time
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = False
            time.sleep(1)  # Simulate downtime
            server["running"] = True
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/servers/<server_id>/command', methods=['POST'])
def send_command(server_id):
    # TODO: Send command to server
    return jsonify({'message': f'Command sent to server {server_id}'})

# --- Server Players ---
@app.route('/servers/<server_id>/players', methods=['GET'])
def get_players(server_id):
    # TODO: Return list of players
    return jsonify({'players': []})

# --- Server World ---
@app.route('/servers/<server_id>/world', methods=['GET'])
def get_world(server_id):
    # TODO: Return world info
    return jsonify({'world': {}})

@app.route('/servers/<server_id>/world/download', methods=['GET'])
def download_world(server_id):
    # TODO: Download world file
    return jsonify({'message': f'Download world for server {server_id}'})

# --- Server Backups ---
@app.route('/servers/<server_id>/backups', methods=['GET'])
def list_backups(server_id):
    # TODO: List backups
    return jsonify({'backups': []})

@app.route('/servers/<server_id>/backups', methods=['POST'])
def create_backup(server_id):
    # TODO: Create backup
    return jsonify({'message': f'Backup created for server {server_id}'})

@app.route('/servers/<server_id>/backups/<backup_id>/restore', methods=['POST'])
def restore_backup(server_id, backup_id):
    # TODO: Restore backup
    return jsonify({'message': f'Backup {backup_id} restored for server {server_id}'})

@app.route('/servers/<server_id>/backups/<backup_id>/download', methods=['GET'])
def download_backup(server_id, backup_id):
    # TODO: Download backup file
    return jsonify({'message': f'Download backup {backup_id} for server {server_id}'})

@app.route('/servers/<server_id>/backups/<backup_id>', methods=['DELETE'])
def delete_backup(server_id, backup_id):
    # TODO: Delete backup
    return jsonify({'message': f'Backup {backup_id} deleted for server {server_id}'})

# --- Settings ---
@app.route('/settings', methods=['GET'])
def get_settings():
    # TODO: Return settings
    return jsonify({'settings': {}})

@app.route('/settings', methods=['PUT'])
def update_settings():
    # TODO: Update settings
    return jsonify({'message': 'Settings updated'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')