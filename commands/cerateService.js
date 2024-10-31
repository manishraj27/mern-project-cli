import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { capitalize } from '../utils/capitalize';

export default function createService(program) {
  program
    .command('add-service <FileName>')
    .description('Generate a service')
    .action((fileName) => {
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';

      // service dir
      const serviceDir = isInBackend
        ? path.join(currentDir, 'services')
        : path.join(currentDir, 'backend', 'services');

      // Create the services directory if it doesn't exist
      if (!fs.existsSync(serviceDir)) {
        try {
          fs.mkdirSync(serviceDir, { recursive: true });
          console.log(chalk.green('✅ Created services directory'));
        } catch (error) {
          console.error(
            chalk.red(
              `❌ Failed to create services directory: ${error.message}`
            )
          );
          return;
        }
      }

      // Service template
      const serviceContent = `
// Service for ${capitalize(fileName)}
import ${capitalize(fileName)} from '../models/${capitalize(fileName)}.js';

class ${capitalize(fileName)}Service {
    // ${capitalize(fileName)} Services..
}

export default ${capitalize(fileName)}Service;
`;

      // Write the service file to the services directory
      try {
        const serviceFilePath = path.join(
          serviceDir,
          `${fileName.toLowerCase()}.js`
        );
        fs.writeFileSync(serviceFilePath, serviceContent);
        console.log(
          chalk.green(
            `✅ ${capitalize(fileName)} created at services/${fileName.toLowerCase()}.js`
          )
        );
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to write service file: ${error.message}`)
        );
        return;
      }

      // Final success message
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(
        chalk.white(
          `1. Review your service in services/${fileName.toLowerCase()}.js`
        )
      );
      console.log(
        chalk.white('2. Import and use your service in your app as needed')
      );
    });
}
