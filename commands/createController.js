import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { capitalize } from '../utils/capitalize';

export default function createController(program) {
  program
    .command('add-controller <FileName>')
    .description('Generate a controller')
    .action((fileName) => {
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';

      // Correct spelling here
      const controllerDir = isInBackend
        ? path.join(currentDir, 'controllers')
        : path.join(currentDir, 'backend', 'controllers');

      // Create the controllers directory if it doesn't exist
      if (!fs.existsSync(controllerDir)) {
        try {
          fs.mkdirSync(controllerDir, { recursive: true });
          console.log(chalk.green('✅ Created controllers directory'));
        } catch (error) {
          console.error(
            chalk.red(
              `❌ Failed to create controllers directory: ${error.message}`
            )
          );
          return;
        }
      }

      // Controller template with corrected syntax
      const controllerContent = `
import ${capitalize(fileName)}Service from '../services/${fileName.toLowerCase()}.js';

class ${capitalize(fileName)}Controller {
    /**
     * ---- Get All ${capitalize(fileName)}s ----
     */
    static async get${capitalize(fileName)}s(_req, res, _next) {
        try {
            res.status(200).json({
                success: true,
                message: "${capitalize(fileName)}'s Controller Ready",
            });
        } catch (error) {
            console.log('Error occurred -- ', error);
        }
    }

    /**
     * ---- Get ${capitalize(fileName)} ----
     */
    static async get${capitalize(fileName)}(_req, res, _next) {
        try {
            res.status(200).json({
                success: true,
                message: "${capitalize(fileName)}'s Controller Ready",
            });
        } catch (error) {
            console.log('Error occurred -- ', error);
        }
    }

    /**
     * ---- Create ${capitalize(fileName)} ----
     */
    static async create${capitalize(fileName)}(_req, res, _next) {
        try {
            res.status(200).json({
                success: true,
                message: "${capitalize(fileName)}'s Controller Ready",
            });
        } catch (error) {
            console.log('Error occurred -- ', error);
        }
    }

    /**
     * ---- Update ${capitalize(fileName)} ----
     */
    static async update${capitalize(fileName)}(_req, res, _next) {
        try {
            res.status(200).json({
                success: true,
                message: "${capitalize(fileName)}'s Controller Ready",
            });
        } catch (error) {
            console.log('Error occurred -- ', error);
        }
    }

    /**
     * ---- Delete ${capitalize(fileName)} ----
     */
    static async delete${capitalize(fileName)}(_req, res, _next) {
        try {
            res.status(200).json({
                success: true,
                message: "${capitalize(fileName)}'s Controller Ready",
            });
        } catch (error) {
            console.log('Error occurred -- ', error);
        }
    }
}

export default ${capitalize(fileName)}Controller;
`;

      // Write the controller file to the controllers directory
      try {
        const controllerFilePath = path.join(
          controllerDir,
          `${fileName.toLowerCase()}.js`
        );
        fs.writeFileSync(controllerFilePath, controllerContent);
        console.log(
          chalk.green(
            `✅ ${capitalize(fileName)} created at controllers/${fileName.toLowerCase()}.js`
          )
        );
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to write controller file: ${error.message}`)
        );
        return;
      }

      // Final success message
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(
        chalk.white(
          `1. Review your controller in controllers/${fileName.toLowerCase()}.js`
        )
      );
      console.log(
        chalk.white('2. Import and use your controller in your app as needed')
      );
    });
}
