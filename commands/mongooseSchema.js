import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default function mongooseSchemaCommand(program) {
  program
    .command('mongoose-schema <ModelName> <fields...>')
    .description('Generate a Mongoose schema with the specified fields')
    .action((modelName, fields) => {
      // Detect if we're in the backend folder or project root
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';

      // Set paths based on current location
      const modelDir = isInBackend
        ? path.join(currentDir, 'models')
        : path.join(currentDir, 'backend', 'models');

      // Create the models directory if it doesn't exist
      if (!fs.existsSync(modelDir)) {
        try {
          fs.mkdirSync(modelDir, { recursive: true });
          console.log(chalk.green('✅ Created models directory'));
        } catch (error) {
          console.error(
            chalk.red(`❌ Failed to create models directory: ${error.message}`)
          );
          return;
        }
      }

      // Generate schema fields based on provided inputs
      const schemaFields = fields
        .map((field) => {
          const [name, type] = field.split(':');
          return `  ${name}: { type: ${type}, required: true }`;
        })
        .join(',\n');

      // Mongoose schema template
      const schemaContent = `import mongoose from 'mongoose';

const ${modelName}Schema = new mongoose.Schema({
${schemaFields}
});

const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);
export default ${modelName};
`;

      // Write the schema file to the models directory
      try {
        const modelFilePath = path.join(modelDir, `${modelName}.js`);
        fs.writeFileSync(modelFilePath, schemaContent);
        console.log(
          chalk.green(
            `✅ Mongoose schema for ${modelName} created at models/${modelName}.js`
          )
        );
      } catch (error) {
        console.error(
          chalk.red(`❌ Failed to write schema file: ${error.message}`)
        );
        return;
      }

      // Final success message
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(
        chalk.white(`1. Review your schema in models/${modelName}.js`)
      );
      console.log(
        chalk.white('2. Import and use your model in your app as needed')
      );
    });
}
