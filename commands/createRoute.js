import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { capitalize } from '../utils/capitalize';

export default function createRoute(program) {
  program
    .command('add-route <FileName>')
    .description('Generate a route')
    .action((fileName) => {
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';

      // route dir
      const routeDir = isInBackend
        ? path.join(currentDir, 'routes')
        : path.join(currentDir, 'backend', 'routes');

      // Create the routes directory if it doesn't exist
      if (!fs.existsSync(routeDir)) {
        try {
          fs.mkdirSync(routeDir, { recursive: true });
          console.log(chalk.green('✅ Created routes directory'));
        } catch (error) {
          console.error(
            chalk.red(`❌ Failed to create routes directory: ${error.message}`)
          );
          return;
        }
      }

      // Route template
      const routeContent = `
// Route for ${capitalize(fileName)}
import { Router } from 'express';
import ${capitalize(fileName)}Controller from '../controllers/${fileName.toLowerCase()}.js';

const router = Router();
    
/**
* ==== ${capitalize(fileName)} Routes ====
*/
router.get('/', ${capitalize(fileName)}Controller.get${capitalize(fileName)}s)
    .post('/', ${capitalize(fileName)}Controller.create${capitalize(fileName)})
    .get('/:Id', ${capitalize(fileName)}Controller.get${capitalize(fileName)})
    .put('/:Id', ${capitalize(fileName)}Controller.update${capitalize(fileName)})
    .delete('/:Id', ${capitalize(fileName)}Controller.delete${capitalize(fileName)});
    
export default router;
`;

      // Write the route file to the routes directory
      try {
        const routeFilePath = path.join(
          routeDir,
          `${fileName.toLowerCase()}.js`
        );
        fs.writeFileSync(routeFilePath, routeContent);
        console.log(
          chalk.green(
            `✅ ${capitalize(fileName)} created at routes/${fileName.toLowerCase()}.js`
          )
        );
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to write route file: ${error.message}`)
        );
        return;
      }

      // Final success message
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(
        chalk.white(
          `1. Review your route in routes/${fileName.toLowerCase()}.js`
        )
      );
      console.log(
        chalk.white('2. Import and use your route in your app as needed')
      );
    });
}
