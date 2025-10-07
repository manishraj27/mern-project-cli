import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { checkNodeVersion } from '../utils/checkNodeVersion.js';
import { taskHandler } from '../utils/taskHandler.js';
import {
  tailwindConfig,
  globalCss,
  babelConfig,
  metroConfig,
  layoutFile,
  indexFile,
  appJson,
} from '../utils/config.js';

function createExpoReactNative(projectName) {
  checkNodeVersion();

  let rootDir = '';
  if (projectName === '.') rootDir = process.cwd();
  else rootDir = path.join(process.cwd(), projectName);

  // Initializing Expo Project
  taskHandler(
    () => {
      execSync(`npx create-expo-app@latest ${projectName}`, {
        stdio: 'inherit',
      });
    },
    '🔧 Initiating Expo project...',
    '✅ Initialized Expo project successfully!',
    '❌ Error while initializing an Expo project'
  );

  // Run Expo Reset Script
  taskHandler(
    () => {
      execSync(`npm run reset-project`, {
        stdio: ['pipe', 'inherit', 'inherit'],
        input: 'Y\n',
        cwd: rootDir,
      });
    },
    '🔧 Resetting Expo project...',
    '✅ Reset Expo project successfully!',
    '❌ Error while resetting an Expo project'
  );

  // Installing NativeWind dependencies
  taskHandler(
    () =>
      execSync(
        'npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0',
        { stdio: 'inherit', cwd: rootDir }
      ),
    '🔧 Installing NativeWind dependencies...',
    '✅ NativeWind dependencies installed successfully!',
    '❌ Error while installing NativeWind dependencies'
  );

  // Installing dev dependencies
  taskHandler(
    () =>
      execSync(
        'npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11',
        { stdio: 'inherit', cwd: rootDir }
      ),
    '🔧 Installing dev dependencies...',
    '✅ dev dependencies installed successfully!',
    '❌ Error while installing dev dependencies'
  );

  // Initializing tailwind config file
  taskHandler(
    () => execSync('npx tailwindcss init', { stdio: 'inherit', cwd: rootDir }),
    '🔧 Installing dev dependencies...',
    '✅ dev dependencies installed successfully!',
    '❌ Error while installing dev dependencies'
  );

  taskHandler(() => {
    fs.writeFileSync(path.join(rootDir, 'tailwind.config.js'), tailwindConfig),
      fs.writeFileSync(path.join(rootDir, './app/global.css'), globalCss),
      fs.writeFileSync(path.join(rootDir, 'babel.config.js'), babelConfig),
      fs.writeFileSync(path.join(rootDir, 'metro.config.js'), metroConfig),
      fs.writeFileSync(path.join(rootDir, './app/_layout.tsx'), layoutFile),
      fs.writeFileSync(path.join(rootDir, './app/index.tsx'), indexFile),
      fs.writeFileSync(path.join(rootDir, 'app.json'), appJson),
      '✍️ Adding files to setup NativeWind...',
      '✅ All files written successfully!',
      '❌ Failed to write some or all files';
  });

  taskHandler(
    () => execSync('git init', { cwd: rootDir }),
    '🔧 Initiating Git repo...',
    '✅ Initialized Git repo successfully!',
    '❌ Error while initializing a Git repo'
  );

  console.log(
    '-------------------------------------------------------------------------'
  );
  console.log(
    chalk.blue(
      '🚀React Native + NativeWind project initialized with all basic configurations successfully!'
    )
  );
  console.log(
    '-------------------------------------------------------------------------'
  );
}

export default function initReactNative(program) {
  program
    .command('create-react-native <projectName>')
    .description('Create a new Expo React Native project')
    .action((projectName) => {
      createExpoReactNative(projectName);
    });
}
