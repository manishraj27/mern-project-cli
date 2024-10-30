import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

export default function addESLintCommand(program) {
  program
    .command('add-eslint [directory]')
    .description('Initialize ESLint in the specified directory')
    .action((directory = '.') => {
      const currentDir = directory;

      // Provide feedback on setup initiation
      console.log(
        chalk.cyan('🛠 Setting up ESLint configurations in:', 'currentDir')
      );

      // Helper function to set up ESLint in a specified path
      function setupESLint(dirPath) {
        try {
          // Ensure the folder exists
          fs.ensureDirSync(dirPath);

          // Basic ESLint configuration file
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
            chalk.green(
              `✅ ESLint config written to ${path.join(dirPath, '.eslintrc.json')}`
            )
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

      // Run setup for the specified directory
      setupESLint(currentDir);

      // Final feedback
      console.log(chalk.cyan('✨ ESLint setup complete. Happy coding!'));
    });
}
