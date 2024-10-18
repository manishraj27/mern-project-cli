#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
import chalk from 'chalk';
const { execSync } = require("child_process");

function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const majorVersion = currentVersion.split(".")[0];
  if (majorVersion < 14) {
    console.error(
      `Your Node.js version (${currentVersion}) is not supported. Please use Node.js 14.x or higher.`
    );
    process.exit(1);
  }
}

function createMERNProject(projectName) {
  const rootDir = path.join(process.cwd(), projectName);

  // Create root project directory
  try {
    fs.mkdirSync(rootDir, { recursive: true });
    console.log("✅ Root directory created successfully.");
  } catch (error) {
    console.error(`❌ Failed to create root directory: ${error.message}`);
    process.exit(1);
  }

  console.log("📦 Creating backend app...");
  const backendDir = path.join(rootDir, "backend");
  const dirsToCreate = [
    "controllers",
    "db",
    "middlewares",
    "models",
    "routes",
    "utils",
  ];

  try {
    fs.mkdirSync(backendDir, { recursive: true });
    dirsToCreate.forEach((dir) =>
      fs.mkdirSync(path.join(backendDir, dir), { recursive: true })
    );
    console.log("✅ Backend directory structure created.");
  } catch (error) {
    console.error(
      `❌ Failed to create backend directory structure: ${error.message}`
    );
    process.exit(1);
  }

  // Backend files creation
  try {
    fs.writeFileSync(
      path.join(backendDir, "constants.js"),
      "// TODO: Add application-wide constants"
    );
    fs.writeFileSync(
      path.join(backendDir, "server.js"),
      `// Entry point of the backend server
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('${projectName.toUpperCase()} BACKEND API');
});

// TODO: Add routes and middleware

app.listen(PORT, () => {
  console.log(\`Server is up and running at http://localhost:\${PORT} 🚀\`);
});`
    );
    fs.writeFileSync(
      path.join(backendDir, ".env.example"),
      `# Sample .env file for backend
PORT=5000
DB_URI=your_database_uri_here
`
    );
    fs.writeFileSync(
      path.join(backendDir, ".gitignore"),
      `node_modules
.env
`
    );
    fs.writeFileSync(
      path.join(backendDir, "README.md"),
      `# ${projectName} Backend
This is the backend of the ${projectName} MERN project.

## Setup

- Install dependencies: \`npm install\`
- Start the development server: \`npm run dev\`

## Environment Variables

Create a \`.env\` file based on \`.env.example\`.
`
    );
    fs.writeFileSync(
      path.join(backendDir, "package.json"),
      JSON.stringify(
        {
          name: `${projectName}-backend`,
          version: "1.0.0",
          main: "server.js",
          scripts: {
            start: "node server.js",
            dev: "nodemon server.js",
          },
          dependencies: {
            express: "^4.21.1",
            mongoose: "^8.7.1",
            cors: "^2.8.5",
            dotenv: "^16.4.5",
          },
          devDependencies: {
            nodemon: "^3.1.7",
          },
        },
        null,
        2
      )
    );
    console.log("✅ Backend files created successfully.");
  } catch (error) {
    console.error(`❌ Failed to create backend files: ${error.message}`);
    process.exit(1);
  }

  // Automatically initialize Git in the backend (with error handling)
  console.log("🔧 Initializing Git repository in backend...");
  try {
    execSync(`git init "${backendDir}"`, { stdio: "inherit" });
    console.log("✅ Git repository initialized in backend.");
  } catch (error) {
    console.warn(
      `⚠️ Git is not installed or an error occurred. Skipping Git initialization.`
    );
  }

  // Automatically run `npm install` in the backend
  console.log("📦 Installing backend dependencies...");
  try {
    execSync(`npm install`, { cwd: backendDir, stdio: "inherit" });
    console.log("✅ Backend dependencies installed.");
  } catch (error) {
    console.error(
      `❌ Failed to install backend dependencies: ${error.message}`
    );
    process.exit(1);
  }

  // Create frontend using create-react-app
  console.log("📦 Creating React frontend app...");
  const frontendDir = path.join(rootDir, "frontend");
  try {
    execSync(`npx create-react-app "${frontendDir}"`, { stdio: "inherit" });
    console.log("✅ React frontend created successfully.");
  } catch (error) {
    console.error(`❌ Failed to create React app: ${error.message}`);
    process.exit(1);
  }

  // Create .env.example for the frontend
  try {
    fs.writeFileSync(
      path.join(frontendDir, ".env.example"),
      `# Sample .env file for frontend
REACT_APP_API_URL=http://localhost:5000/api
`
    );
    console.log("✅ Frontend .env.example file created.");
  } catch (error) {
    console.error(
      `❌ Failed to create frontend .env.example file: ${error.message}`
    );
    process.exit(1);
  }

  // Final project setup message
  console.log(`\n🎉 MERN project "${projectName}" created successfully!`);

  console.log(`
${chalk.green.bold('To get started:')}
  ${chalk.blue(`cd "${projectName}"`)}

${chalk.magenta.bold('Backend:')}
  ${chalk.blue('cd backend')}
  ${chalk.yellow('npm start')} ${chalk.cyan('or')} ${chalk.yellow('npm run dev [nodemon]')}

${chalk.magenta.bold('Frontend:')}
  ${chalk.blue('cd frontend')}
  ${chalk.yellow('npm start')}
`);
}

// Parse command line arguments
const projectName = process.argv[2];
if (!projectName) {
  console.error("❌ Please provide a project name");
  process.exit(1);
}

// Check Node.js version
checkNodeVersion();

createMERNProject(projectName);
