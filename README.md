<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# 🚀 MERN Project Generator CLI
> Create production-ready MERN stack projects in seconds!
### Website [https://devcli.vercel.app](https://devcli.vercel.app)

![NPM Weekly Downloads](https://img.shields.io/npm/dw/mern-project-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)
![NPM Total Downloads](https://img.shields.io/npm/dt/mern-project-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge)
[![Node.js Package](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml)

Are you tired of:
- ⏰ Spending hours setting up basic MERN project structures?
- 🔧 Configuring MongoDB connections from scratch?
- 📁 Creating the same folder structure over and over?
- 🎯 Missing important configurations in your initial setup?
- 🔄 Copying boilerplate code from old projects?

**MERN Project Generator CLI** is your ultimate solution! In just seconds, create a complete, production-ready MongoDB, Express, React, and Node.js project structure with a single command. 

## ✨ Features

- **One Command Setup**: Generate both frontend and backend with a single command
- **Industry-Standard Structure**: Pre-configured folder structure following best practices
- **Instant MongoDB Integration**: Connect to MongoDB with zero configuration
- **Generate Mongoose Schema**: Generate Mongoose Schema with just one command
- **Development Ready**: Hot-reloading enabled for both frontend and backend
- **Pre-configured Environment**: `.env.example` files included with sensible defaults
- **Git Ready**: Initialized Git repository with proper `.gitignore` files

## 📑 Index
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Commands](#%EF%B8%8F-commands)
  - [1. devcli create](#1-create-mern-project)
  - [2. devcli mongodb-connect](#2-connect-mongodb)
  - [3. devcli mongoose-schema](#3-mongoose-schema)
- [Complete User Journey Example](#-Complete-User-Journey-Example)
- [Future Enhancements](#-future-enhancements)
- [Contribute](#-contribute-to-the-project)
- [License](#-license)
- [Support the project](#-support-the-project)

## ⚡ Requirements

Before you begin, ensure your system meets these requirements:

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher
- **MongoDB**: Local or remote installation

## 📦 Installation

Install the CLI tool globally to use it from anywhere in your system:

```bash
npm install -g mern-project-cli
```

To check installation version:
```bash
devcli --version
```

## 🛠️ Commands

### 1. Create MERN Project

```bash
devcli create <your_project_name>
```

#### What This Command Does:

##### 1. **📁 Creates Project Structure**: 
The generated project follows the MVC (Model-View-Controller) pattern, a battle-tested architecture that separates your application into three main components:

```
your-project-name/
├── backend/
│   ├── controllers/         # Handle business logicdocumentation
│   ├── db/                  # Database configuration
│   ├── middlewares/         # Custom middleware functionsdocumentation
│   ├── models/              # MongoDB Schema model
│   ├── routes/              # API route definitions
│   ├── utils/               # Helper functionsdocumentation
│   ├── .env.example         # Environment variables template
│   ├── .gitignore           # Git ignore rules
│   ├── constants.js         # Application constants
│   ├── package.json         # Dependencies and scripts
│   ├── README.md            # Backend documentation
│   └── server.js            # Server entry point
└── frontend/
    ├── public/              # Static files
    ├── src/                 # React source code
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── utils/           # Helper functions
    │   └── App.js           # Root component
    ├── .env.example         # Frontend environment template
    └── package.json         # Frontend dependencies
```

##### 2. **Installs Dependencies**:
   - Backend:
     - Express
     - Mongoose
     - CORS
     - dotenv
     - nodemon (dev dependency)
   - Frontend:
     - React
     - React Router
     - Axios
     - Other Create React App dependencies


#### After Creation:

##### **Start Backend Development**:
```bash
cd your-project-name/backend
```
```bash
npm run dev             # Start development server with nodemon
```


##### **Start Frontend Development**:
```bash
cd your-project-name/frontend
```

```
npm start               # Start React App
```

### 2. Connect MongoDB
- Create database as your_project_name_db
```bash
devcli mongodb-connect
```
- Or with custom database name
```
devcli mongodb-connect --project custom-name  
```

#### Options:
- `-p, --project <name>`: Specify custom database name
- No options: Uses project folder name as database name

#### What This Command Does:

##### 1. **Creates Database Connection**:
   - Generates `connection.js` in the `db` folder
   - Sets up Mongoose connection with error handling
   - Configures connection string based on environment variables

##### 2. **Updates Server Configuration**:
   - Adds database connection import to `server.js`
   - Sets up connection status logging

#### Usage Examples:

```bash
# Using project name
devcli mongodb-connect

# Using custom database name
devcli mongodb-connect --project custom_name
```

#### Generated Files:

```javascript
// db/connection.js
require('dotenv').config();
const mongoose = require('mongoose');

const dburl = process.env.DB_URL || "mongodb://localhost:27017/your_db_name";
mongoose.connect(dburl)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log(err.message));
```

### 3. Generate Mongoose Schema
- Create mongoose schema for your backend.
```bash
devcli devcli mongoose-schema <schema-name> <fieldName:fieldType fieldName:fieldType ...>

```
Example
```bash
devcli mongoose-schema User name:String email:String password:String
```
This will create a ```User.js``` file with a Mongoose schema inside the ```models/``` directory:
```javascript
//models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
export default User;

```

#### Explanation:
The ```mongoose-schema``` command takes a model name (User) and field definitions (name:String, email:String, password:String), generating a Mongoose model file in the ```models/``` folder.

## 📖 Complete User Journey Example

Let's create a blog application from scratch:

```bash
# Step 1: Install CLI globally
npm install -g mern-project-cli

# Step 2: Create new project
devcli create my-blog-app

# Step 3: Set up backend
cd my-blog-app/backend
npm run dev

# Step 4: Set up frontend (new terminal)
cd ../frontend
npm start

# Step 5: Connect MongoDB (optional)
cd ../backend
devcli mongodb-connect

# Step 6: Generate Mongoose Scheama (optional)
devcli mongoose-schema Blog name:String category:String

🎉 Congratulations! Your blog application structure is ready with:
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- MongoDB connected and ready to use
```

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database Configuration
DB_URI=mongodb://localhost:27017/your_db_name
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000

```

## 🔧 Development Commands

### Backend Commands
```bash
npm run dev     # Start with auto-reload (development)
npm start       # Start without auto-reload (production)
```

### Frontend Commands
```bash
npm start       # Start development server
npm run build   # Create production build
npm test        # Run tests
npm run eject   # Eject from Create React App
```


### Why Choose MERN Project Generator CLI?

#### 🎯 Perfect For:
- **Startups**: Launch MVPs faster with a solid foundation
- **Freelancers**: Start client projects instantly
- **Teams**: Maintain consistent project structure across developers
- **Learning**: Focus on coding instead of setup when learning MERN stack
- **Hackathons**: Get your project up and running in minutes

#### 💪 Built for Real Development:
- **Production-Ready**: Follows industry best practices out of the box
- **Scalable Structure**: Organized for growth from day one
- **Developer Friendly**: Hot-reloading, environment configs, and Git ready
- **Customizable**: Easy to modify and extend based on your needs
- **Time-Saving**: Eliminate repetitive setup tasks

#### 🛠️ What You Get:
- **Complete MERN Setup**: MongoDB, Express, React, and Node.js configured and ready
- **Modern Tooling**: Latest versions of all dependencies
- **Development Mode**: Hot-reloading for both frontend and backend
- **API Ready**: Basic API structure with examples
- **Database Connected**: MongoDB configuration with just one command
- **Generate Schema**: Generate Mongoose Schema with one command
- **Environment Ready**: Pre-configured environment files
- **Version Control**: Git initialized with proper `.gitignore` files

Skip the boring setup and jump straight into building your next big idea! Whether you're creating a quick prototype, starting a serious project, or learning the MERN stack, this CLI tool gives you the perfect foundation to build upon.


## 🔮 Future Enhancements

1. **Code Generation**
   - API route generator
   - React component generator
   - CRUD operations generator

2. **Template System**
   - Custom template support

## 🤝 Contribute to the Project
We welcome and appreciate contributions to MERN Project Generator CLI! If you’d like to help improve this tool, feel free to:
- Fork the repository
- Submit pull requests
- Open issues for bugs or suggestions
Your contributions will help make this tool even better for the developer community!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/manishraj27/mern-project-cli?tab=MIT-1-ov-file) file for details.

## 🌟 Support the Project

If you find this tool helpful, please consider:
- Giving it a star on [GitHub](https://github.com/manishraj27/mern-project-cli)
- View on NPM [mern-project-cli](https://www.npmjs.com/package/mern-project-cli)
- Sharing it with your fellow developers
- Contributing to its development
---

<div align="center">
  <h3>🌟 Made with ❤️ by Manish Raj</h3>
  <p>
    <a href="https://manishraj.me/">Portfolio</a> •
    <a href="https://github.com/manishraj27">GitHub</a> •
    <a href="https://www.linkedin.com/in/manishraj27">LinkedIn</a> •
    <a href="https://x.com/manish_rraaj">Twitter</a>
  </p>
</div>
