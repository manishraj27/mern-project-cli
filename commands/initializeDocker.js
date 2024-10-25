import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default function dockerFilesCommand(program) {
    program
        .command('create-dockerfiles')
        .description('Generate Dockerfiles for backend and frontend, and docker-compose.yml in root')
        .action(() => {
            const currentDir = process.cwd();

            // Check if we are in the root directory
            const isBackend = path.basename(currentDir) === 'backend';
            const isFrontend = path.basename(currentDir) === 'frontend';

            if (!isBackend || !isFrontend) {
                console.error(chalk.red('❌ You must be in the root directory of the project.'));
                console.log(chalk.yellow('📁 Please navigate to the project root directory and then re-run the command.'));
                return;
            }

            const backendDir = path.join(currentDir, 'backend');
            const frontendDir = path.join(currentDir, 'frontend');

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
      # DB_URL: mongodb://mongo:27017/${DB_NAME}

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

            // Create backend Dockerfile
            const backendDockerfilePath = path.join(backendDir, 'Dockerfile');
            try {
                fs.writeFileSync(backendDockerfilePath, backendDockerfileContent);
                console.log(chalk.green('✅ Backend Dockerfile created successfully.'));
            } catch (error) {
                console.error(chalk.red(`❌ Failed to create Backend Dockerfile: ${error.message}`));
                return;
            }

            // Create frontend Dockerfile
            const frontendDockerfilePath = path.join(frontendDir, 'Dockerfile');
            try {
                fs.writeFileSync(frontendDockerfilePath, frontendDockerfileContent);
                console.log(chalk.green('✅ Frontend Dockerfile created successfully.'));
            } catch (error) {
                console.error(chalk.red(`❌ Failed to create Frontend Dockerfile: ${error.message}`));
                return;
            }

            // Create docker-compose.yml in root
            const dockerComposePath = path.join(currentDir, 'docker-compose.yml');
            try {
                fs.writeFileSync(dockerComposePath, dockerComposeContent);
                console.log(chalk.green('✅ docker-compose.yml created successfully.'));
            } catch (error) {
                console.error(chalk.red(`❌ Failed to create docker-compose.yml: ${error.message}`));
            }

            // Final success message
            console.log(chalk.cyan('\n🎉 Docker files created successfully!'));
        });
}
