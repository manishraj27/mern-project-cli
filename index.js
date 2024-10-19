#!/usr/bin/env node

import { Command } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

import createMERNProjectCommand from "./commands/createMERNProject.js";
import mongodbConnectCommand from "./commands/mongodbConnect.js";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse the package.json to get the version
const packageJson = JSON.parse(
  readFileSync(path.join(__dirname, "package.json"), "utf-8")
);

const program = new Command();

// Set up the CLI program
program
  .name("devcli")
  .description("A developer-friendly CLI tool that streamlines MERN stack development by automating project setup, database configuration, and boilerplate generation by implementing MVC Architecture. Create production-ready MongoDB, Express, React, and Node.js applications with best practices built-in")
  .version(packageJson.version);

// Register commands
createMERNProjectCommand(program);
mongodbConnectCommand(program);

// Parse the arguments and start the CLI
program.parse(process.argv);
