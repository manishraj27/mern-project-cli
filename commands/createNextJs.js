import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const majorVersion = currentVersion.split(".")[0];
  if (majorVersion < 14) {
    console.error(
      `Your Node.js version (${currentVersion}) is not supported. Please use Node.js 14.x or higher.`
    );
    process.exit(1);
  }
}

export default function createNextJsProject(program) {
  program
    .command("next <projectName>")
    .description("Create a new next js project")
    .action((projectName) => {
      checkNodeVersion();

      const rootDir = path.join(process.cwd(), projectName);

      // Create root project directory
      //   try {
      //     fs.mkdirSync(rootDir, { recursive: true });
      //     console.log("✅ Root directory created successfully.");
      //   } catch (error) {
      //     console.error(`❌ Failed to create root directory: ${error.message}`);
      //     process.exit(1);
      //   }

      // Initializing root project
      try {
        execSync(`npx create-next-app@latest ${projectName}`, {
          stdio: "inherit",
        });
        console.log("✅ Initialized a NextJS project successfully!");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }

      // Installing other dependencies and dev dependencies
      try {
        console.log("🔧 Installing other dependencies...");
        execSync(
          "npm i --force axios bcryptjs jsonwebtoken chalk react-hook-form react-icons",
          { stdio: "inherit", cwd: rootDir }
        );
        // execSync('npm install -D ', { stdio: "inherit", cwd: rootDir })
        console.log("✅ Installed successfully!");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }

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

      // Creating directories
      try {
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
        console.log("✅ Directories created successfully!");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }

      try {
        fs.writeFileSync(path.join(rootDir, 'src', 'middleware.ts'), '//Your middleware logic here')
      } catch (error) {
        console.log(error)
        process.exit(1)
      }

      try {
        console.log("Initializing Git repo")
        execSync('git init', { cwd: rootDir })
        console.log("Initialized Git repo")
      } catch (error) {
        console.log(error)
        process.exit(1)
      }

      console.log("Done!")
    });
}
