<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# 🚀 MERN Project Generator CLI


> Create production-ready MERN stack projects in seconds!


### NPM Package Website [mern-project-cli](https://www.npmjs.com/package/mern-project-cli)


### Website [https://devcli.vercel.app](https://devcli.vercel.app)

![NPM Total Downloads](https://img.shields.io/npm/dt/mern-project-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge)
![NPM Weekly Downloads](https://img.shields.io/npm/dw/mern-project-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)
[![Node.js Package](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml)

**MERN Project Generator CLI** is a powerful tool designed to simplify the process of setting up a complete, production-ready MERN stack project in seconds.

This tool eliminates the need for manual configurations, boilerplate code copying, and repetitive tasks, allowing developers to start building their apps right away with best practices in place. Perfect for both beginners and experienced developers, it saves time and ensures a solid project foundation.

## ✨ Features

- **One Command Setup**: Generate both frontend and backend with a single command
- **Industry-Standard Structure**: Pre-configured folder structure following best practices
- **Create frontend with shadcn and vite**, a new React project with either Shadcn UI + Tailwind CSS or just Vite + Tailwind CSS using a single command.
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
  - [4. devcli add-redux](#4-add-redux)
  - [5. devcli create-frontend <project_name>](#5-create-frontend-project)
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

- Backend: Express, Mongoose, CORS, dotenv, nodemon.
- Frontend: React, React Router, Axios, Other Create React App dependencies.

- Backend: Express, Mongoose, CORS, dotenv, nodemon.
- Frontend: React, React Router, Axios, Other Create React App dependencies.

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

#### Or you can start with Docker:

> [!IMPORTANT]
> You have Docker installed on system
> Add DB_NAME in /backend/.env

> [!NOTE]
> DON'T ADD YOUR SYSTEM/PROD DB_URL

> -d will hide the logs

```bash
docker-compose up -d
```

to check logs

```bash
docker-compose logs frontend
```

```bash
docker-compose logs backend
```

### 2. Connect MongoDB


- Create database as your_project_name_db


```bash
devcli mongodb-connect
```


- Or with custom database name


```
devcli mongodb-connect --project custom-name
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

- Generates `connection.js` in the `db` folder
- Sets up Mongoose connection with error handling
- Configures connection string based on environment variables

##### 2. **Updates Server Configuration**:

- Adds database connection import to `server.js`
- Sets up connection status logging

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
require("dotenv").config();
const mongoose = require("mongoose");

const dburl = process.env.DB_URL || "mongodb://localhost:27017/your_db_name";
mongoose
  .connect(dburl)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log(err.message));
```

### 3. Generate Mongoose Schema


- Create mongoose schema for your backend.


```bash
devcli devcli mongoose-schema <schema-name> <fieldName:fieldType fieldName:fieldType ...>

```


#### Usage Example


```bash
devcli mongoose-schema User name:String email:String password:String
```

This will create a `User.js` file with a Mongoose schema inside the `models/` directory:


This will create a `User.js` file with a Mongoose schema inside the `models/` directory:

```javascript
//models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
export default User;
```

#### Explanation:

The `mongoose-schema` command takes a model name (User) and field definitions (name:String, email:String, password:String), generating a Mongoose model file in the `models/` folder.

The `mongoose-schema` command takes a model name (User) and field definitions (name:String, email:String, password:String), generating a Mongoose model file in the `models/` folder.

### 4. Add Redux

### 4. Add Redux

Set up Redux in your project or add new Redux slices.

#### Initialize Redux


```bash
devcli add-redux --init
```


###### What does this command do:


- Sets up Redux store configuration
- Creates necessary store files and directories
- Installs required dependencies (@reduxjs/toolkit and react-redux)
- Creates hooks for easier Redux usage

#### Create Redux Slice


```bash
devcli add-redux --slice <sliceName> --actions="action1,action2" --state="field1:type,field2:type"
```

Options:


- `--slice`: Name of the slice to create
- `--actions`: Comma-separated list of actions for the slice
- `--state`: Initial state fields with types (string, boolean, array)

#### Usage Example:


```bash
devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"
```

This creates:


- A new slice file in `src/store/slices`
- Boilerplate for specified actions
- Initial state with typed fields
- Automatic integration with the Redux store

#### Example Generated Redux Slice


When you run the command:


```bash
devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"
```

It generates the following slice in `src/store/slices/userSlice.js`:


```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Implement login logic here
    },
    logout: (state, action) => {
      // Implement logout logic here
    },
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

### 5. Create Frontend Project

Create a new React project with either Shadcn UI + Tailwind CSS or just Vite + Tailwind CSS using a single command.

```bash
# Create project with Shadcn UI
devcli create-frontend <project_name> --shadcn

# Create project with Vite + Tailwind CSS
devcli create-frontend <project_name> --vite
```

#### Features

##### With --shadcn flag:

- Creates a Vite + React project
- Installs and configures Tailwind CSS
- Sets up Shadcn UI with New York style and Zinc color scheme
- Configures project structure with best practices
- Adds initial button component as example
- Sets up path aliases for better imports
- Includes all necessary configuration files

##### With --vite flag:

- Creates a basic Vite + React project
- Installs and configures Tailwind CSS
- Sets up minimal project structure
- Includes starter template with modern styling

#### Options

- `--shadcn`: Include Shadcn UI setup with Tailwind CSS
- `--vite`: Create basic Vite project with Tailwind CSS only

#### Usage Examples

```bash
# Create a new React project with Shadcn UI
devcli create-frontend my-app --shadcn

# Create a new React project with just Vite + Tailwind
devcli create-frontend my-app --vite

# Navigate to project
cd my-app

# Start development server
npm run dev
```

#### Generated Project Structure with --shadcn

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── button.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   └── index.css
├── jsconfig.json
├── tailwind.config.js
├── vite.config.js
└── components.json
```

#### After Creation with --shadcn

- Add more Shadcn components using:
  ```bash
  npx shadcn@latest add <component-name>
  ```
- Available components can be found at [shadcn/ui components](https://ui.shadcn.com/docs/components)
- Customize theme in `tailwind.config.js`
- Add your own components in `src/components`

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


# Step 7: Set up Redux
cd ../frontend
devcli add-redux --init

# Step 8: Create blog slice for Redux
devcli add-redux --slice blog --actions="addPost,deletePost,updatePost" --state="posts:array,loading:boolean"

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
DB_Name=<your db name> #if dont specify docker will use `mydatabase`
```

### Frontend (.env)


```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000

```

## 🔧 Available Commands

### CLI Commands

#### Project Setup


```bash
npm install -g mern-project-cli    # Install CLI globally
devcli --version                   # Check CLI version
devcli create <project-name>       # Create new MERN project
```

```bash
OR [Create frontend with shadcn+tailwind/ vite+tailwind]

devcli create-frontend <project-name> --shadcn    # shadcn-frontend
devcli create-frontend <project-name> --vite      # vite-frontend
```

#### Backend CLI Commands


```bash
# Database Connection
devcli mongodb-connect                                          # Connect MongoDB using project name
devcli mongodb-connect -p custom-name                           # Connect with custom database name

# Schema Generation
devcli mongoose-schema <schema-name> <fieldName:fieldType ...>  # Generate Mongoose schema
# Example: devcli mongoose-schema User name:String email:String password:String
```

#### Frontend CLI Commands


```bash
# Redux Setup
devcli add-redux --init                                          # Initialize Redux in frontend
devcli add-redux --slice <name> --actions="action1,action2" --state="field1:type,field2:type"       #Create Slice
# Example: devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"
```

### Development Commands

#### Backend Development


```bash
cd backend                 # Navigate to backend directory
npm install                # Install dependencies
npm run dev                # Start with auto-reload (development)
npm start                  # Start without auto-reload (production)
```

#### Frontend Development


```bash
cd frontend                # Navigate to frontend directory
npm install                # Install dependencies
npm start                  # Start development server

```

<!--

<!--
### CLI Options

#### Backend Options
```bash
# MongoDB Connect Options
-p, --project <name>      # Specify custom database name

# Mongoose Schema Options
<schema-name>             # Name of the schema to generate
<fieldName:fieldType>     # Field definitions (e.g., name:String)
```

#### Frontend Options
```bash
# Redux Options
--init                    # Initialize Redux setup
--slice <name>           # Create a new Redux slice
--actions <actions>      # Comma-separated list of actions (e.g., "login,logout")
--state <state>          # Initial state fields (e.g., "username:string,isLoggedIn:boolean")
``` -->
<!--
<!--
### Common Project Commands
```bash
# Start both frontend and backend (from project root)
cd backend && npm run dev  # Terminal 1
cd frontend && npm start  # Terminal 2

# Install all dependencies (from project root)
cd backend && npm install
cd frontend && npm install
``` -->

<!--
<!--
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
 -->

## 🔮 Future Enhancements

1. **Code Generation**
   More Code-Snippets
   More Code-Snippets

## 🤝 Contribute to the Project


We welcome and appreciate contributions to MERN Project Generator CLI! If you’d like to help improve this tool, feel free to do so.

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
