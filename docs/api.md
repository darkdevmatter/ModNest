# ModNest API Documentation

This document provides detailed information about the ModNest backend API endpoints.

## Base URL

All API endpoints are prefixed with `/api` and are served from `http://localhost:5000` in development.

## Authentication

### Login
- **Endpoint:** `POST /api/login`
- **Description:** Authenticate a user
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:** 
  ```json
  {
    "success": true,
    "user": "string"
  }
  ```
- **Test Credentials:**
  - Username: `admin`
  - Password: `Welcome123$`

### Signup
- **Endpoint:** `POST /api/signup`
- **Description:** Register a new user
- **Status:** Not implemented

### Logout
- **Endpoint:** `POST /api/logout`
- **Description:** Log out the current user
- **Status:** Not implemented

## User Management

### Get Current User
- **Endpoint:** `GET /api/user`
- **Description:** Get information about the currently logged-in user
- **Response:**
  ```json
  {
    "username": "string"
  }
  ```

## Server Management

### List Servers
- **Endpoint:** `GET /api/servers`
- **Description:** Get a list of all servers
- **Response:**
  ```json
  {
    "servers": [
      {
        "id": "number",
        "name": "string",
        "running": "boolean",
        "type": "string",
        "players": "number",
        "maxPlayers": "number",
        "ip": "string",
        "isAdmin": "boolean",
        "mcsmUrl": "string"
      }
    ]
  }
  ```

### Create Server
- **Endpoint:** `POST /api/servers`
- **Description:** Create a new server
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:** Returns the created server object

### Get Server
- **Endpoint:** `GET /api/servers/<server_id>`
- **Description:** Get information about a specific server
- **Status:** Not implemented

### Update Server
- **Endpoint:** `PUT /api/servers/<server_id>`
- **Description:** Update server information
- **Status:** Not implemented

### Delete Server
- **Endpoint:** `DELETE /api/servers/<server_id>`
- **Description:** Delete a server
- **Status:** Not implemented

## Server Actions

### Start Server
- **Endpoint:** `POST /api/servers/<server_id>/start`
- **Description:** Start a server
- **Response:**
  ```json
  {
    "success": true
  }
  ```

### Stop Server
- **Endpoint:** `POST /api/servers/<server_id>/stop`
- **Description:** Stop a server
- **Response:**
  ```json
  {
    "success": true
  }
  ```

### Restart Server
- **Endpoint:** `POST /api/servers/<server_id>/restart`
- **Description:** Restart a server
- **Response:**
  ```json
  {
    "success": true
  }
  ```

### Send Command
- **Endpoint:** `POST /api/servers/<server_id>/command`
- **Description:** Send a command to the server
- **Status:** Not implemented

## Server Players

### List Players
- **Endpoint:** `GET /api/servers/<server_id>/players`
- **Description:** Get a list of players on the server
- **Response:**
  ```json
  {
    "players": [
      {
        "name": "string"
      }
    ]
  }
  ```

## Server World

### Get World Info
- **Endpoint:** `GET /api/servers/<server_id>/world`
- **Description:** Get information about the server world
- **Status:** Not implemented

### Download World
- **Endpoint:** `GET /api/servers/<server_id>/world/download`
- **Description:** Get a download link for the world file
- **Response:**
  ```json
  {
    "url": "string",
    "message": "string"
  }
  ```

## Server Backups

### List Backups
- **Endpoint:** `GET /api/servers/<server_id>/backups`
- **Description:** Get a list of server backups
- **Response:**
  ```json
  {
    "backups": [
      {
        "id": "string",
        "timestamp": "string"
      }
    ]
  }
  ```

### Create Backup
- **Endpoint:** `POST /api/servers/<server_id>/backups`
- **Description:** Create a new backup
- **Response:** Returns the created backup object

### Restore Backup
- **Endpoint:** `POST /api/servers/<server_id>/backups/<backup_id>/restore`
- **Description:** Restore a backup
- **Response:**
  ```json
  {
    "message": "string"
  }
  ```

### Download Backup
- **Endpoint:** `GET /api/servers/<server_id>/backups/<backup_id>/download`
- **Description:** Get a download link for a backup
- **Response:**
  ```json
  {
    "url": "string",
    "message": "string"
  }
  ```

### Delete Backup
- **Endpoint:** `DELETE /api/servers/<server_id>/backups/<backup_id>`
- **Description:** Delete a backup
- **Response:**
  ```json
  {
    "message": "string"
  }
  ```

## Settings

### Get Settings
- **Endpoint:** `GET /api/settings`
- **Description:** Get application settings
- **Status:** Not implemented

### Update Settings
- **Endpoint:** `PUT /api/settings`
- **Description:** Update application settings
- **Status:** Not implemented

## Development Notes

- All endpoints return JSON responses
- The API is currently in development mode with sample data
- CORS is enabled for development, allowing requests from `http://localhost:3000`
- Some endpoints are marked as "Not implemented" and return placeholder responses
- The API uses sample data for demonstration purposes 