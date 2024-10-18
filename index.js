#!/usr/bin/env node

import { Command } from "commander";
import createMERNProjectCommand from "./commands/createMERNProject.js";
import mongodbConnectCommand from "./commands/mongodbConnect.js";

const program = new Command();

// Set up the CLI program
program
  .name("devcli")
  .description("A CLI tool to scaffold and manage MERN stack projects")
  .version("1.0.0");

// Register commands
createMERNProjectCommand(program);
mongodbConnectCommand(program);

// Parse the arguments and start the CLI
program.parse(process.argv);
