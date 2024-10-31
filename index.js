#!/usr/bin/env node

// Import necessary modules
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import createMERNProjectCommand from './commands/createMERNProject.js';
import mongodbConnectCommand from './commands/mongodbConnect.js';
import mongooseSchemaCommand from './commands/mongooseSchema.js';
import addReduxCommand from './commands/addRedux.js';
import createFrontend from './commands/createFrontend.js';
import initializeDockerCommand from './commands/initializeDocker.js';
import createController from './commands/createController.js';

// Step 1: Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Step 2: Read and parse the package.json to get the version number
const packageJson = JSON.parse(
  readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
);

const program = new Command();

// Step 3: Set up the CLI program with basic metadata
program
  .name('devcli')
  .description(
    'A developer-friendly CLI tool that streamlines MERN stack development by automating project setup, database configuration, and boilerplate generation by implementing MVC Architecture. Create production-ready MongoDB, Express, React, and Node.js applications with best practices built-in'
  )
  .version(packageJson.version);

// Step 4: Register each command with the program
createMERNProjectCommand(program);
mongodbConnectCommand(program);
mongooseSchemaCommand(program);
addReduxCommand(program);
createFrontend(program);
initializeDockerCommand(program);
createController(program);

// Step 5: Parse the provided arguments and start the CLI
program.parse(process.argv);
