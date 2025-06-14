from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
# CORS(
#     app,
#     supports_credentials=True,
#     resources={r"/*": {"origins": "http://localhost:3000"}}
# )
CORS(app, supports_credentials=True)
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
@app.route('/api/user', methods=['GET'])
def get_user():
    return jsonify(CURRENT_USER)

# --- Server List/Creation ---
@app.route('/api/servers', methods=['GET'])
def list_servers():
    return jsonify({'servers': SERVERS})

@app.route('/api/servers', methods=['POST'])
def create_server():
    data = request.json
    name = data.get('name', 'New Server')
    new_id = max(s["id"] for s in SERVERS) + 1 if SERVERS else 1
    new_server = {
        "id": new_id,
        "name": name,
        "running": False,
        "type": "Bedrock Edition",
        "players": 0,
        "maxPlayers": 10,
        "ip": f"192.168.1.{new_id + 10}:19132",
        "isAdmin": False,
        "mcsmUrl": "",
    }
    SERVERS.append(new_server)
    return jsonify({"success": True, "server": new_server}), 201

# --- Individual Server ---
@app.route('/api/servers/<server_id>', methods=['GET'])
def get_server(server_id):
    # TODO: Return server info
    return jsonify({'server_id': server_id})

@app.route('/api/servers/<server_id>', methods=['PUT'])
def update_server(server_id):
    # TODO: Update server info
    return jsonify({'message': f'Server {server_id} updated'})

@app.route('/api/servers/<server_id>', methods=['DELETE'])
def delete_server(server_id):
    # TODO: Delete server
    return jsonify({'message': f'Server {server_id} deleted'})

# --- Server Actions ---
@app.route('/api/servers/<int:server_id>/start', methods=['POST'])
def start_server(server_id):
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = True
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/api/servers/<int:server_id>/stop', methods=['POST'])
def stop_server(server_id):
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = False
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/api/servers/<int:server_id>/restart', methods=['POST'])
def restart_server(server_id):
    import time
    for server in SERVERS:
        if server["id"] == server_id:
            server["running"] = False
            time.sleep(1)  # Simulate downtime
            server["running"] = True
            return jsonify({"success": True})
    return jsonify({"error": "Server not found"}), 404

@app.route('/api/servers/<server_id>/command', methods=['POST'])
def send_command(server_id):
    # TODO: Send command to server
    return jsonify({'message': f'Command sent to server {server_id}'})

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')