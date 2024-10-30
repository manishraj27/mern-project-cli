import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

export default function addESLintCommand(program) {
  program
    .command('add-eslint')
    .description('Initialize ESLint in the backend, frontend, or both folders')
    .option('--backend', 'Set up ESLint in the backend folder')
    .option('--frontend', 'Set up ESLint in the frontend folder')
    .action((options) => {
      // Step 1: Determine which folders to initialize
      const currentDir = process.cwd();
      const setupBackend =
        options.backend || (!options.backend && !options.frontend);
      const setupFrontend =
        options.frontend || (!options.backend && !options.frontend);

      // Step 2: Set paths for backend and frontend
      const backendPath = setupBackend
        ? path.join(currentDir, 'backend')
        : null;
      const frontendPath = setupFrontend
        ? path.join(currentDir, 'frontend')
        : null;

      // Provide feedback on setup initiation
      console.log(chalk.cyan('🛠 Setting up ESLint configurations...'));

      // Step 3: Helper function to set up ESLint in a specified path
      function setupESLint(dirPath) {
        if (!dirPath) return;

        try {
          // Ensure the folder exists
          fs.ensureDirSync(dirPath);

          // basic ESLint configuration file
          const eslintConfigPath = path.join(dirPath, '.eslintrc.json');
          const eslintConfigContent = {
            env: {
              browser: dirPath.includes('frontend'),
              node: dirPath.includes('backend'),
              es2021: true,
            },
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            parserOptions: { ecmaVersion: 12 },
            rules: {},
          };

          fs.writeFileSync(
            eslintConfigPath,
            JSON.stringify(eslintConfigContent, null, 2)
          );
          console.log(
            chalk.green(`✅ ESLint config written to ${dirPath}/.eslintrc.json`)
          );

          // Install ESLint and Prettier dependencies
          console.log(
            chalk.cyan(`📦 Installing ESLint and Prettier in ${dirPath}...`)
          );
          execSync(
            `cd ${dirPath} && npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev`,
            { stdio: 'inherit' }
          );
          console.log(
            chalk.green(`✅ ESLint and Prettier installed in ${dirPath}`)
          );
        } catch (error) {
          console.error(
            chalk.red(
              `❌ Failed to set up ESLint in ${dirPath}: ${error.message}`
            )
          );
        }
      }

      // Step 4: Run setup for each specified folder
      if (setupBackend) setupESLint(backendPath);
      if (setupFrontend) setupESLint(frontendPath);

      // Final feedback
      console.log(chalk.cyan('✨ ESLint setup complete. Happy coding!'));
    });
}
