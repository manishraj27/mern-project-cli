#!/usr/bin/env node

import { Command } from "commander";
import createMERNProjectCommand from "./commands/createMERNProject.js";
import mongodbConnectCommand from "./commands/mongodbConnect.js";

const program = new Command();

// Set up the CLI program
program
  .name("devcli")
  .description("A developer-friendly CLI tool that streamlines MERN stack development by automating project setup, database configuration, and boilerplate generation by implementing MVC Architecture. Create production-ready MongoDB, Express, React, and Node.js applications with best practices built-in")
  .version("1.0.0");

// Register commands
createMERNProjectCommand(program);
mongodbConnectCommand(program);

// Parse the arguments and start the CLI
program.parse(process.argv);
