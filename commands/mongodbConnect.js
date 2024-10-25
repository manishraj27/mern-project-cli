import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default function mongodbConnectCommand(program) {
  program
    .command('mongodb-connect')
    .description('Generate MongoDB connection code')
    .option('-p, --project <name>', 'Project name for database')
    .action((options) => {
      // Detect if we're in the backend folder or project root
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';

      // If in backend, try to get project name from parent directory
      let projectName = options.project;
      if (!projectName && isInBackend) {
        projectName = path.basename(path.dirname(currentDir));
      } else if (!projectName) {
        projectName = path.basename(currentDir);
      }

      // Convert project name to database name format (lowercase, underscores)
      const dbName = process.env.DB_NAME || projectName.toLowerCase().replace(/-/g, '_');

      // Set paths based on current location
      const dbDir = isInBackend
        ? path.join(currentDir, 'db')
        : path.join(currentDir, 'backend', 'db');

      const serverFilePath = isInBackend
        ? path.join(currentDir, 'server.js')
        : path.join(currentDir, 'backend', 'server.js');

      // Create the MongoDB connection code with dynamic database name
      const dbConnectionCode = `// Initiate connection to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

const dburl = process.env.DB_URL || "mongodb://localhost:27017/${dbName || 'mydatabase'}";
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully");
}).catch((err) => {
    console.log(err.message);
});`;

      // Check if db directory exists first
      if (!fs.existsSync(dbDir)) {
        try {
          fs.mkdirSync(dbDir, { recursive: true });
          console.log(chalk.green('✅ Created db directory'));
        } catch (error) {
          console.error(chalk.red(`❌ Failed to create db directory: ${error.message}`));
          return;
        }
      }

      // Write the connection code to connection.js in db directory
      try {
        fs.writeFileSync(path.join(dbDir, 'connection.js'), dbConnectionCode);
        console.log(chalk.green('✅ MongoDB connection code written to db/connection.js'));
      } catch (error) {
        console.error(chalk.red(`❌ Failed to write MongoDB connection code: ${error.message}`));
        return;
      }

      // Verify server.js exists
      if (!fs.existsSync(serverFilePath)) {
        console.error(chalk.red('❌ server.js not found. Make sure you are in the correct directory.'));
        return;
      }

      // Add require statement to server.js
      try {
        // Read existing content of server.js
        const serverContent = fs.readFileSync(serverFilePath, 'utf8');

        // Check if the connection is already required
        if (!serverContent.includes("require('./db/connection')")) {
          // Add the require statement after the other requires
          const updatedContent = serverContent.replace(
            "require('dotenv').config();",
            "require('dotenv').config();\nconst dbconnection = require('./db/connection');"
          );

          fs.writeFileSync(serverFilePath, updatedContent);
          console.log(chalk.green('✅ MongoDB connection import added to server.js'));
        } else {
          console.log(chalk.yellow('⚠️ MongoDB connection already imported in server.js'));
        }
      } catch (error) {
        console.error(chalk.red(`❌ Failed to update server.js: ${error.message}`));
      }

      // Final success message with next steps
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(chalk.white(`1. Your database name is set to: ${dbName}_db`));
      console.log(chalk.white('2. Add DB_URL to your .env file if you want to use a custom MongoDB URL'));
      console.log(chalk.white('3. Make sure MongoDB is running if using local database'));
    });
}