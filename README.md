# ModNest

<div align="center">
  <img src="docs/images/logo.png" alt="ModNest Logo" width="300"/>
</div>

---

## Introduction

ModNest is a comprehensive Minecraft server hosting solution designed to be easy, safe, and fun for families, kids, and educational institutions. With features like instant server creation, robust parental controls, and a user-friendly web admin, ModNest aims to make Minecraft server hosting accessible to everyone.

## Key Features

- **Instant Server Creation**: Launch a modded or vanilla Minecraft server in seconds without technical expertise.
- **Kid Mode**: Enforces parental controls, limits external communication, and can optionally turn off chat for extra safety.
- **Safe Multiplayer**: Built-in tools for whitelisting, kicking, or banning players; full control over who joins your child's world.
- **Modpack Marketplace**: Browse, preview, and install top modpacks with a click, curated for kid-friendliness.
- **Parental Dashboard**: View activity logs, manage server settings, approve friends, and monitor playtime from an easy web portal.
- **Automated Backups & Rollbacks**: Never lose a world. Restore to previous saves instantly.
- **Mobile Friendly**: All controls work seamlessly from desktop or mobile devices.

## Getting Started

This project consists of a React frontend and a Flask backend. Both need to be running for the full application to work.

### Prerequisites

Ensure you have the following installed:
- Node.js and npm (for frontend)
- Python 3.x (for backend)
- pip (Python package manager)

### Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/yourusername/modnest.git](https://github.com/yourusername/modnest.git)
    cd modnest
    ```

2. Frontend Setup:
    ```bash
    cd modnest-frontend
    npm install
    ```

3. Backend Setup:
    ```bash
    cd modnest-backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
    pip install -r requirements.txt
    ```

### Running the Application

1. Start the Backend Server:
    ```bash
    cd modnest-backend
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
    python app.py
    ```
    The backend server will start on http://localhost:5000

    For detailed API documentation, including all available endpoints, request/response formats, and development notes, please see [API Documentation](docs/api.md).

    For development, the backend includes sample data and a test user:
    - Username: `admin`
    - Password: `Welcome123$`

2. Start the Frontend Development Server:
    ```bash
    cd modnest-frontend
    npm start
    ```
    The frontend will be available at http://localhost:3000

### Development Notes

- The backend uses Flask with CORS enabled for development
- The frontend is configured to connect to the backend at http://localhost:5000
- For development, the backend includes sample server data
- All API endpoints return JSON responses
- The backend is currently in development mode with sample data
- For complete API documentation, see [API Documentation](docs/api.md)

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Ejects the project from Create React App for customization.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: your.email@darkdevmatter.com
- **Website**: [modnest.com](https://modnest.com) (Coming Soon)
- **Demo & Early Access**: Invite list open—get feedback from parents, teachers, and kids before public launch.

---

Let's build safer, smarter Minecraft hosting—together!