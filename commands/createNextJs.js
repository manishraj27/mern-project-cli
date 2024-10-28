import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { checkNodeVersion } from "../utils/checkNodeVersion.js";
import { taskHandler } from "../utils/taskHandler.js";

const middlewareContent = `
"use server"

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
    try {

        const response = NextResponse.next();
        return response;

    } catch (err: any) {
        return NextResponse.next({ "message": "Server Error", "error": err?.message }, { status: 500 })
    }
}

export const config = {
    matcher: [
        '/'
    ]
}
`

export default function createNextJsProject(projectName) {

      checkNodeVersion()
      
      let rootDir = ''
      if(projectName === '.')
        rootDir = process.cwd()
      else
        rootDir = path.join(process.cwd(), projectName);

      // Initializing Next JS Project
      taskHandler(
        () =>
          execSync(`npx create-next-app@latest ${projectName}`, {
            stdio: "inherit",
          }),
        "🔧 Initiating Next JS project...",
        "✅ Initialized Next JS project successfully!",
        "❌ Error while initializing a Next JS project"
      );

      // Installing Other dependencies
      taskHandler(
        () =>
          execSync(
            "npm i --force axios bcryptjs jsonwebtoken chalk react-hook-form react-icons",
            { stdio: "inherit", cwd: rootDir }
          ),
        "🔧 Installing other dependencies...",
        "✅ Other dependencies installed successfully!",
        "❌ Error while installing other dependencies"
      );

      // Creating directories
      taskHandler(
        () => {
          const dirsToCreate = [
            "actions",
            "components",
            "forms",
            "hooks",
            "lib",
            "types",
            "utils",
            "models",
          ];

          const appDirsToCreate = ["(main)", "(auth)", "api"];

          dirsToCreate.forEach((dir) => {
            const appDir = path.join(rootDir, "src", dir);
            fs.mkdirSync(appDir, { recursive: true });
          });

          let isAppDir = fs.existsSync(path.join(rootDir, "src", "app"));
          let appPath = "";
          if (isAppDir) appPath = path.join(rootDir, "src", "app");
          else appPath = path.join(rootDir, "src");

          appDirsToCreate.forEach((dir) => {
            const appDir = path.join(appPath, dir);
            fs.mkdirSync(appDir, { recursive: true });
          });
        },
        "🔧 Creating directories...",
        "✅ Error while creating directories",
        "❌ Directories created successfully!"
      );

      // Creating middleware file
      taskHandler(
        () => {
          let fileName = 'middleware.js'
          const isTSProject = fs.existsSync(path.join(rootDir, "tsconfig.json"))
          if(isTSProject) fileName = 'middleware.ts'
          fs.writeFileSync(
            path.join(rootDir, "src", fileName),
            middlewareContent
          )
        },
        "🔧 Creating Middleware file...",
        "✅ Middleware created successfully!",
        "❌ Error while creating middleware file"
      );

      taskHandler(
        () => execSync("git init", { cwd: rootDir }),
        "🔧 Initiating Git repo...",
        "✅ Initialized Git repo successfully!",
        "❌ Error while initializing a Git repo"
      );

      
      console.log("-------------------------------------------------------------------------")
      console.log(chalk.greenBright("Next JS project initialized with all basic configurations successfully!"));
      console.log("-------------------------------------------------------------------------")

}
