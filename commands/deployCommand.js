import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

function checkVercelLogin() {
  try {
    // Check if the user is logged in to Vercel
    execSync('vercel whoami', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function deployFrontendToVercel(options) {
  const currentDir = process.cwd();

  // Step 1: Check if the current directory is a valid frontend app
  if (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    console.error(
      chalk.red(
        '❌ This does not seem to be a valid frontend app. Make sure you are in the root of your frontend project.'
      )
    );
    process.exit(1);
  }

  // Step 2: Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch {
    console.error(
      chalk.red(
        '❌ Vercel CLI is not installed. Please install it using `npm install -g vercel`.'
      )
    );
    process.exit(1);
  }

  // Step 3: Check if the user is logged in to Vercel
  if (!checkVercelLogin()) {
    console.log(
      chalk.yellow(
        '🔑 You are not logged in to Vercel. Please log in to continue.'
      )
    );
    try {
      execSync('vercel login', { stdio: 'inherit' });
    } catch {
      console.error(chalk.red('❌ Failed to log in to Vercel.'));
      process.exit(1);
    }
  }

  // Step 4: Upload environment variables (if .env file exists)
  if (fs.existsSync(path.join(currentDir, '.env'))) {
    console.log(chalk.blue('📦 Uploading environment variables...'));
    try {
      execSync('vercel env pull .env', { stdio: 'inherit' });
    } catch {
      console.error(chalk.red('❌ Failed to upload environment variables.'));
      process.exit(1);
    }
  }

  // Step 5: Deploy to Vercel
  console.log(chalk.blue('🚀 Deploying frontend to Vercel...'));
  try {
    const deployCommand = options.preview ? 'vercel' : 'vercel --prod';
    execSync(deployCommand, { stdio: 'inherit' });
    console.log(chalk.green('✅ Frontend deployed successfully!'));
  } catch (error) {
    console.error(chalk.red(`❌ Failed to deploy frontend: ${error.message}`));
    process.exit(1);
  }

  // Step 6: Display deployment URL
  try {
    const deploymentUrl = execSync('vercel --prod --yes', {
      stdio: 'pipe',
    }).toString();
    console.log(
      chalk.green.bold('\n🎉 Your frontend has been deployed to Vercel!')
    );
    console.log(chalk.cyan(`👉 Open the deployed URL: ${deploymentUrl}`));
  } catch {
    console.error(chalk.red('❌ Failed to retrieve deployment URL.'));
  }
}

export default function addDeployCommand(program) {
  program
    .command('deploy')
    .description('Deploy your frontend to Vercel')
    .option('--vercel', 'Deploy to Vercel')
    .option('--preview', 'Deploy a preview version (not production)')
    .option('--domain <domain>', 'Specify a custom domain for deployment')
    .action(async (options) => {
      if (!options.vercel) {
        console.log(
          chalk.red('Please specify a deployment target (e.g., --vercel)')
        );
        process.exit(1);
      }

      deployFrontendToVercel(options);
    });
}
