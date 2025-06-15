from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    servers = db.relationship('Server', backref='owner', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat()
        }

class Server(db.Model):
    __tablename__ = 'servers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    server_type = db.Column(db.String(20), nullable=False)  # 'java' or 'bedrock'
    version = db.Column(db.String(20))
    ip = db.Column(db.String(50))
    port = db.Column(db.Integer)
    max_players = db.Column(db.Integer, default=20)
    is_running = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Minecraft Server Manager specific fields
    mcsm_url = db.Column(db.String(200))
    world_name = db.Column(db.String(100))
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.server_type,
            'version': self.version,
            'ip': self.ip,
            'port': self.port,
            'maxPlayers': self.max_players,
            'running': self.is_running,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'mcsmUrl': self.mcsm_url,
            'worldName': self.world_name
        }

class Backup(db.Model):
    __tablename__ = 'backups'
    
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    size = db.Column(db.Integer)  # Size in bytes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(500))
    
    server = db.relationship('Server', backref='backups')
    
    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'filename': self.filename,
            'size': self.size,
            'created_at': self.created_at.isoformat(),
            'description': self.description
        } 