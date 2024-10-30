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
        chalk.cyan(`🛠 Setting up ESLint configurations in: ${currentDir}`)
      );

      // Helper function to set up ESLint in a specified path
      function setupESLint(dirPath) {
        try {
          fs.ensureDirSync(dirPath);

          const isFrontend = dirPath.includes('frontend');
          const eslintConfigContent = {
            env: {
              browser: isFrontend,
              node: !isFrontend,
              es2021: true,
            },
            extends: [
              'eslint:recommended',
              'plugin:prettier/recommended',
              ...(isFrontend ? ['plugin:react/recommended'] : []),
            ],
            parserOptions: { ecmaVersion: 12, sourceType: 'module' },
            rules: {},
          };

          // Write .eslintrc.json file
          const eslintConfigPath = path.join(dirPath, '.eslintrc.json');
          fs.writeFileSync(
            eslintConfigPath,
            JSON.stringify(eslintConfigContent, null, 2)
          );
          console.log(
            chalk.green(`✅ ESLint config written to ${eslintConfigPath}`)
          );

          // Add lint scripts to package.json
          const packageJsonPath = path.join(dirPath, 'package.json');
          const packageJson = fs.existsSync(packageJsonPath)
            ? JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
            : {};

          packageJson.scripts = {
            ...(packageJson.scripts || {}),
            lint: 'eslint .',
            'lint:fix': 'eslint . --fix',
          };

          fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2)
          );
          console.log(
            chalk.green(`✅ ESLint scripts added to ${packageJsonPath}`)
          );

          // Install ESLint dependencies
          const dependencies = [
            'eslint',
            'prettier',
            'eslint-config-prettier',
            'eslint-plugin-prettier',
            ...(isFrontend ? ['eslint-plugin-react'] : []),
          ];

          console.log(
            chalk.cyan(`📦 Installing ESLint and Prettier in "${dirPath}"...`)
          );
          execSync(
            `cd ${dirPath} && npm install ${dependencies.join(' ')} --save-dev`,
            {
              stdio: 'inherit',
            }
          );
          console.log(
            chalk.green(`✅ ESLint and Prettier installed in "${dirPath}".`)
          );
        } catch (error) {
          console.error(
            chalk.red(
              `❌ Failed to set up ESLint in ${dirPath}: ${error.message}`
            )
          );
        }
      }

      setupESLint(currentDir);

      console.log(chalk.cyan('✨ ESLint setup complete. Happy coding!'));
    });
}
