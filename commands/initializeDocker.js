import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default function initializeDockerCommand(program) {
  program
    .command('create-dockerfiles')
    .description(
      'Generate Dockerfiles for backend and frontend, and docker-compose.yml in root'
    )
    .action(() => {
      const currentDir = process.cwd();

      // Check if backend and frontend directories exist
      const backendDir = path.join(currentDir, 'backend');
      const frontendDir = path.join(currentDir, 'frontend');

      const hasBackendDir = fs.existsSync(backendDir);
      const hasFrontendDir = fs.existsSync(frontendDir);

      if (!hasBackendDir || !hasFrontendDir) {
        console.error(chalk.red('❌ Required directory structure not found.'));
        console.log(
          chalk.yellow(
            '📁 Please ensure both "backend" and "frontend" directories exist in the current directory.'
          )
        );
        return;
      }
      // Dockerfile for backend
      const backendDockerfileContent = `# Use the official Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
`;
      const dockerIgnore = `node_modules
dist`;

      // Dockerfile for frontend
      const frontendDockerfileContent = `# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"]

`;

      // docker-compose.yml content
      const dockerComposeContent = `# version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    environment:
      DB_URL: mongodb://mongo:27017/mydatabase # you can change db name here to your liking
      # this doesnt work since for that we need .env on same level
      # DB_URL: mongodb://mongo:27017/\${DB_NAME}

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    environment:
      REACT_APP_API_URL: http://localhost:5000/api
    depends_on:
      - backend # Ensure the backend is started before the frontend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:

`;

      // Create backend Dockerfile & .dockerignore
      const backendDockerfilePath = path.join(backendDir, 'Dockerfile');
      const backendDockerIgorefilePath = path.join(backendDir, '.dockerignore');
      try {
        fs.writeFileSync(backendDockerfilePath, backendDockerfileContent);
        fs.writeFileSync(backendDockerIgorefilePath, dockerIgnore);
        console.log(chalk.green('✅ Backend Dockerfile created successfully.'));
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to create Backend Dockerfile: ${error.message}`)
        );
        return;
      }

      // Create frontend Dockerfile & .dockerignore
      const frontendDockerfilePath = path.join(frontendDir, 'Dockerfile');
      const frontendDockerIgorefilePath = path.join(
        frontendDir,
        '.dockerignore'
      );
      try {
        fs.writeFileSync(frontendDockerfilePath, frontendDockerfileContent);
        fs.writeFileSync(frontendDockerIgorefilePath, dockerIgnore);
        console.log(
          chalk.green('✅ Frontend Dockerfile created successfully.')
        );
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to create Frontend Dockerfile: ${error.message}`)
        );
        return;
      }

      // Create docker-compose.yml in root
      const dockerComposePath = path.join(currentDir, 'docker-compose.yml');
      try {
        fs.writeFileSync(dockerComposePath, dockerComposeContent);
        console.log(chalk.green('✅ docker-compose.yml created successfully.'));
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to create docker-compose.yml: ${error.message}`)
        );
      }

      // Final success message
      console.log(chalk.cyan('\n🎉 Docker files created successfully!'));
    });
}
