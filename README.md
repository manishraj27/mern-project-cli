<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# MERN Project Generator CLI
> **Generate a complete MERN stack project with a single command!** 🚀

![npm](https://img.shields.io/npm/dt/mern-project-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge)
![npm](https://img.shields.io/npm/dw/mern-project-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)
[![Node.js Package](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml)

**MERN Project Generator CLI** is a powerful command-line tool designed to jumpstart your MERN (MongoDB, Express, React, Node.js) stack projects. With just one command, you can scaffold a complete project structure for both backend and frontend, following best practices and including essential configurations.

## Key Features

- **Full MERN Stack Setup**: Generate both backend and frontend projects in one go.
- **Best Practices Built-in**: The generated projects follow industry-standard best practices for MERN stack development.
- **Dynamic MongoDB Integration**: Easily set up MongoDB connection with automatic database naming.
- **Customizable Database Names**: Flexibility to use custom database names or automatic project-based naming.
- **Environment Ready**: Includes pre-configured `.env.example` files for both frontend and backend.
- **Development Mode**: Built-in development server configuration with nodemon.
- **Instant Development Ready**: Start coding your application logic immediately after generation.

## Requirements

- Node.js 14.x or higher
- npm 6.x or higher
- MongoDB (local or remote)

## Installation

Install the CLI globally using npm:

```bash
npm install -g mern-project-cli
```

## Available Commands

Check all available commands and options:

```bash
devcli --help
```

This will show you:
```
Usage: devcli [options] [command]

A CLI tool to scaffold and manage MERN stack projects

Options:
  -V, --version                    output the version number
  -h, --help                       display help for command

Commands:
  create <projectName>             Create a new MERN project
  mongodb-connect [options]        Generate MongoDB connection code
  help [command]                   display help for command
```

### Creating a New Project

Create a new MERN project:

```bash
devcli create your-project-name
```

This will:
1. Create the complete project structure
2. Initialize Git repository
3. Install all dependencies
4. Set up development scripts

### Setting up MongoDB Connection

You have two options for setting up MongoDB connection:

1. **Using Project Name as Database Name**:
```bash
devcli mongodb-connect
```
This will create a database named `your_project_name_db`

2. **Using Custom Database Name**:
```bash
devcli mongodb-connect -p custom_name
# or
devcli mongodb-connect --project custom_name
```
This will create a database named `custom_name_db`

## Generated Project Structure

```
your-project-name/
├── backend/
│   ├── controllers/
│   ├── db/
│   │   └── connection.js         # MongoDB connection configuration
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example             # DB_URL=mongodb://localhost:27017/your_db
│   ├── .gitignore              # Includes node_modules, .env, etc.
│   ├── constants.js
│   ├── package.json            # Includes express, mongoose, dotenv, etc.
│   ├── README.md
│   └── server.js              # Express server with MongoDB connection
└── frontend/
    ├── public/
    ├── src/
    ├── .env.example          # REACT_APP_API_URL=http://localhost:5000/api
    ├── package.json
    └── README.md
```

## Getting Started After Generation

1. Navigate to your new project:
   ```bash
   cd your-project-name
   ```

2. Set up the backend:
   ```bash
   cd backend
   cp .env.example .env    # Copy and configure environment variables
   npm run dev            # Start development server with nodemon
   ```

3. Set up the frontend (in a new terminal):
   ```bash
   cd frontend
   cp .env.example .env   # Copy and configure environment variables
   npm start             # Start React development server
   ```

4. Set up MongoDB:
   ```bash
   devcli mongodb-connect   # From project root or backend directory
   ```

## Environment Variables

### Backend (.env)
```env
PORT=5000
DB_URL=mongodb://localhost:27017/your_project_db  # Default if not specified
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Scripts

### Backend
```bash
npm run dev   # Start development server with nodemon
npm start     # Start production server
```

### Frontend
```bash
npm start     # Start development server
npm build     # Create production build
```

## Customization

The generated structure is designed to be easily customizable:

- **Controllers**: Add your API logic in `backend/controllers/`
- **Models**: Define MongoDB schemas in `backend/models/`
- **Routes**: Add API routes in `backend/routes/`
- **Middlewares**: Add custom middlewares in `backend/middlewares/`
- **Frontend Components**: Add React components in `frontend/src/components/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT](https://github.com/manishraj27/mern-project-cli/blob/main/LICENSE) License.

## Give ⭐ to the repo [mern-project-cli](https://github.com/manishraj27/mern-project-cli)
---

<div align="center">
  <p>Made with ❤️ by Manish Raj</p>
  <p>
    <a href="https://manishraj.me/" target="_blank">Portfolio</a>&nbsp;
    <a href="https://github.com/manishraj27" target="_blank">GitHub</a>&nbsp;
    <a href="https://www.linkedin.com/in/manishraj27" target="_blank">LinkedIn</a>&nbsp;
    <a href="https://x.com/manish_rraaj" target="_blank">Twitter</a>&nbsp;
  </p>
</div>