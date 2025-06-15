import os
from pathlib import Path

class Config:
    # Base directory of the project
    BASE_DIR = Path(__file__).resolve().parent
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{BASE_DIR}/modnest.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')
    
    # CORS settings
    CORS_ORIGINS = ["http://localhost:3000"]
    
    # Development settings
    DEBUG = True 