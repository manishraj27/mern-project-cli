import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const detectProjectType = (dirPath) => {
  try {
    const packageJsonPath = path.join(dirPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return 'javascript';

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (dependencies['react']) return 'react';
    if (dependencies['vue']) return 'vue';
    if (dependencies['typescript']) return 'typescript';
    if (dependencies['express'] || dependencies['nest']) return 'node';
    return 'javascript';
  } catch {
    return 'javascript';
  }
};

const getESLintConfig = (projectType) => {
  const baseConfig = {
    env: {
      es2021: true,
      // Set environment based on project type
      browser: !['node'].includes(projectType),
      node: ['node', 'typescript'].includes(projectType),
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
          tabWidth: 2,
        },
      ],
    },
  };

  const configs = {
    react: {
      ...baseConfig,
      extends: [
        ...baseConfig.extends,
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['react', 'react-hooks'],
      settings: {
        react: { version: 'detect' },
      },
    },
    vue: {
      ...baseConfig,
      extends: [...baseConfig.extends, 'plugin:vue/vue3-recommended'],
      plugins: ['vue'],
    },
    typescript: {
      ...baseConfig,
      extends: [...baseConfig.extends, 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
    node: {
      ...baseConfig,
      extends: [...baseConfig.extends, 'plugin:node/recommended'],
      plugins: ['node'],
      rules: {
        ...baseConfig.rules,
        'no-process-env': 'warn',
      },
    },
  };

  return configs[projectType] || baseConfig;
};

const getDependencies = (projectType) => {
  const baseDeps = [
    'eslint',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
  ];

  const projectDeps = {
    react: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
    vue: ['eslint-plugin-vue'],
    typescript: [
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
    ],
    node: ['eslint-plugin-node'],
  };

  return [...baseDeps, ...(projectDeps[projectType] || [])];
};

const setupESLint = async (dirPath) => {
  try {
    const projectType = detectProjectType(dirPath);
    console.log(`Setting up ESLint for ${projectType} project...`);

    // Write ESLint config
    await fs.writeJSON(
      path.join(dirPath, '.eslintrc.json'),
      getESLintConfig(projectType),
      { spaces: 2 }
    );

    // Write Prettier config
    await fs.writeJSON(
      path.join(dirPath, '.prettierrc'),
      {
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 80,
        tabWidth: 2,
      },
      { spaces: 2 }
    );

    // Update package.json
    const packageJsonPath = path.join(dirPath, 'package.json');
    const packageJson = fs.existsSync(packageJsonPath)
      ? await fs.readJSON(packageJsonPath)
      : { scripts: {} };

    packageJson.scripts = {
      ...packageJson.scripts,
      lint: 'eslint . --ext .js,.jsx,.ts,.tsx,.vue',
      'lint:fix': 'eslint . --ext .js,.jsx,.ts,.tsx,.vue --fix',
      format: 'prettier --write "**/*.{js,jsx,ts,tsx,vue,json,css,scss,md}"',
    };

    await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });

    // Install dependencies
    const dependencies = getDependencies(projectType);
    execSync(`npm install ${dependencies.join(' ')} --save-dev`, {
      stdio: 'inherit',
      cwd: dirPath,
    });

    console.log('ESLint setup complete!');
    return true;
  } catch (error) {
    console.error(`Setup failed: ${error.message}`);
    return false;
  }
};

export default function addESLintCommand(program) {
  program
    .command('add-eslint [directory]')
    .description('Initialize ESLint and Prettier in the specified directory')
    .action(async (directory = '.') => {
      await setupESLint(path.resolve(directory));
    });
}
