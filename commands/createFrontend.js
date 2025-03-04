import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const majorVersion = currentVersion.split('.')[0];
  if (majorVersion < 14) {
    console.error(
      `Your Node.js version (${currentVersion}) is not supported. Please use Node.js 14.x or higher.`
    );
    process.exit(1);
  }
}

function createShadcnProject(projectName) {
  checkNodeVersion();
  const rootDir = path.join(process.cwd(), projectName);

  // Step 1: Create Vite Project
  console.log('📦 Creating Vite React project...');
  try {
    execSync(`npm create vite@latest ${projectName} -- --template react-swc`, {
      stdio: 'inherit',
    });
    console.log('✅ Vite project created successfully.');
  } catch (error) {
    console.error(`❌ Failed to create Vite project: ${error.message}`);
    process.exit(1);
  }

  // Change to project directory
  process.chdir(rootDir);

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install dependencies: ${error.message}`);
    process.exit(1);
  }

  // Step 3: Install Tailwind CSS
  console.log('📦 Installing Tailwind CSS...');
  try {
    execSync('npm install tailwindcss @tailwindcss/vite', { stdio: 'inherit' });
    console.log('✅ Tailwind CSS installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install Tailwind CSS: ${error.message}`);
    process.exit(1);
  }

  // Step 4: Update index.css
  const indexCss = `@import "tailwindcss";`;
  try {
    fs.writeFileSync(path.join(rootDir, 'src', 'index.css'), indexCss);
    console.log('✅ index.css updated.');
  } catch (error) {
    console.error(`❌ Failed to update index.css: ${error.message}`);
    process.exit(1);
  }

  // Step 5: Update vite.config.js
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;

  try {
    fs.writeFileSync(path.join(rootDir, 'vite.config.js'), viteConfig);
    console.log('✅ vite.config.js updated.');
  } catch (error) {
    console.error(`❌ Failed to update vite.config.js: ${error.message}`);
    process.exit(1);
  }

  // Step 6: Create jsconfig.json
  const jsConfig = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
  };

  try {
    fs.writeFileSync(
      path.join(rootDir, 'jsconfig.json'),
      JSON.stringify(jsConfig, null, 2)
    );
    console.log('✅ jsconfig.json created.');
  } catch (error) {
    console.error(`❌ Failed to create jsconfig.json: ${error.message}`);
    process.exit(1);
  }

  // Step 7: Install @types/node
  console.log('📦 Installing @types/node...');
  try {
    execSync('npm install -D @types/node', { stdio: 'inherit' });
    console.log('✅ @types/node installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install @types/node: ${error.message}`);
    process.exit(1);
  }

  // Step 8: Update vite.config.js with path alias
  const updatedViteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;

  try {
    fs.writeFileSync(path.join(rootDir, 'vite.config.js'), updatedViteConfig);
    console.log('✅ vite.config.js updated with path alias.');
  } catch (error) {
    console.error(`❌ Failed to update vite.config.js: ${error.message}`);
    process.exit(1);
  }

  // Step 9: Initialize Shadcn
  console.log('📦 Initializing Shadcn...');
  try {
    execSync('npx shadcn@canary init', { stdio: 'inherit' });
    console.log('✅ Shadcn initialized successfully.');
  } catch (error) {
    console.error(`❌ Failed to initialize Shadcn: ${error.message}`);
    process.exit(1);
  }

  // Step 10: Add button component
  console.log('📦 Adding button component...');
  try {
    execSync('npx shadcn@latest add button', { stdio: 'inherit' });
    console.log('✅ Button component added successfully.');
  } catch (error) {
    console.error(`❌ Failed to add button component: ${error.message}`);
    process.exit(1);
  }

  // Step 11: Update App.jsx
  const appJsx = `import { Button } from './components/ui/button';

function App() {
  const handleButtonClick = () => {
    window.open('https://devcli.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 font-sans">
      <div className="bg-white bg-opacity-5 backdrop-blur-lg p-10 rounded-xl shadow-xl max-w-md text-center border border-gray-700">
        <h1 className="text-2xl text-gray-700 font-semibold mb-4 tracking-wide">MERN Project Initialized</h1>
        <p className="text-sm text-gray-800 mb-6">
          This project is powered by{' '}
          <a
            href="https://www.npmjs.com/package/mern-project-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 underline transition"
          >
            mern-project-cli
          </a>
          , built with <strong>Shadcn UI</strong> and <strong>Tailwind CSS</strong>.
        </p>
        <p className="text-sm text-gray-800 mb-6">
          Check out the official{' '}
          <a
            href="https://devcli.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 underline transition"
          >
            DevCLI website
          </a>{' '}
          for more.
        </p>
        
        <Button 
          onClick={handleButtonClick}
          className="px-6 py-2 mt-4 text-sm font-medium bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;`;

  try {
    fs.writeFileSync(path.join(rootDir, 'src', 'App.jsx'), appJsx);
    console.log('✅ App.jsx updated.');
  } catch (error) {
    console.error(`❌ Failed to update App.jsx: ${error.message}`);
    process.exit(1);
  }

  // Final success message
  console.log(
    `\n🎉 React project "${projectName}" with Shadcn UI created successfully!`
  );

  console.log(
    `${chalk.green.bold('To get started:')}
${chalk.blue(`cd ${projectName}`)}
${chalk.yellow('npm run dev')}

${chalk.magenta.bold('Available commands:')}
${chalk.yellow('npm run dev')} - Start development server
${chalk.yellow('npm run build')} - Build for production
${chalk.yellow('npm run preview')} - Preview production build

${chalk.cyan.bold('To add more Shadcn components:')}
${chalk.yellow('npx shadcn@latest add <component-name>')}
`
  );
}

function createViteProject(projectName) {
  checkNodeVersion();
  const rootDir = path.join(process.cwd(), projectName);

  // Step 1: Create Vite Project
  console.log('📦 Creating Vite React project...');
  try {
    execSync(`npm create vite@latest ${projectName} -- --template react-swc`, {
      stdio: 'inherit',
    });
    console.log('✅ Vite project created successfully.');
  } catch (error) {
    console.error(`❌ Failed to create Vite project: ${error.message}`);
    process.exit(1);
  }

  // Change to project directory
  process.chdir(rootDir);

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install dependencies: ${error.message}`);
    process.exit(1);
  }

  // Step 3: Install Tailwind CSS
  console.log('📦 Installing Tailwind CSS...');
  try {
    execSync('npm install tailwindcss @tailwindcss/vite', { stdio: 'inherit' });
    console.log('✅ Tailwind CSS installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install Tailwind CSS: ${error.message}`);
    process.exit(1);
  }

  // Step 4: Update index.css
  const indexCss = `@import "tailwindcss";`;
  try {
    fs.writeFileSync(path.join(rootDir, 'src', 'index.css'), indexCss);
    console.log('✅ index.css updated.');
  } catch (error) {
    console.error(`❌ Failed to update index.css: ${error.message}`);
    process.exit(1);
  }

  // Step 5: Update vite.config.js
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;

  try {
    fs.writeFileSync(path.join(rootDir, 'vite.config.js'), viteConfig);
    console.log('✅ vite.config.js updated.');
  } catch (error) {
    console.error(`❌ Failed to update vite.config.js: ${error.message}`);
    process.exit(1);
  }

  // Step 6: Create jsconfig.json
  const jsConfig = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
  };

  try {
    fs.writeFileSync(
      path.join(rootDir, 'jsconfig.json'),
      JSON.stringify(jsConfig, null, 2)
    );
    console.log('✅ jsconfig.json created.');
  } catch (error) {
    console.error(`❌ Failed to create jsconfig.json: ${error.message}`);
    process.exit(1);
  }

  // Step 7: Install @types/node
  console.log('📦 Installing @types/node...');
  try {
    execSync('npm install -D @types/node', { stdio: 'inherit' });
    console.log('✅ @types/node installed successfully.');
  } catch (error) {
    console.error(`❌ Failed to install @types/node: ${error.message}`);
    process.exit(1);
  }

  // Step 8: Update vite.config.js with path alias
  const updatedViteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;

  try {
    fs.writeFileSync(path.join(rootDir, 'vite.config.js'), updatedViteConfig);
    console.log('✅ vite.config.js updated with path alias.');
  } catch (error) {
    console.error(`❌ Failed to update vite.config.js: ${error.message}`);
    process.exit(1);
  }

  // Final success message
  console.log(
    `\n🎉 React project "${projectName}" with Tailwind CSS created successfully!`
  );

  console.log(
    `${chalk.green.bold('To get started:')}
${chalk.blue(`cd ${projectName}`)}
${chalk.yellow('npm run dev')}

${chalk.magenta.bold('Available commands:')}
${chalk.yellow('npm run dev')} - Start development server
${chalk.yellow('npm run build')} - Build for production
${chalk.yellow('npm run preview')} - Preview production build
`
  );
}

export default function createFrontend(program) {
  program
    .command('create-frontend <projectName>')
    .description(
      'Create a new React project with optional Shadcn UI and Tailwind CSS'
    )
    .option('--shadcn', 'Include Shadcn UI setup')
    .option('--vite', 'Create basic Vite + Tailwind CSS setup')
    .action(async (projectName, options) => {
      if (!options.shadcn && !options.vite) {
        console.log(
          'Please use either --shadcn or --vite flag to specify the project type'
        );
        process.exit(1);
      }

      if (options.shadcn && options.vite) {
        console.log('Please choose only one option: either --shadcn or --vite');
        process.exit(1);
      }

      if (options.shadcn) {
        createShadcnProject(projectName);
      } else if (options.vite) {
        createViteProject(projectName);
      }
    });
}
