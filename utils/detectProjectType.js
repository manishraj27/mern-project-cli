export const detectProjectType = (dirPath) => {
  try {
    const packageJsonPath = path.join(dirPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return 'javascript';
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (dependencies['next']) return 'next';
    if (dependencies['react']) return 'react';
    if (dependencies['vue']) return 'vue';
    if (dependencies['typescript']) return 'typescript';
    if (dependencies['express'] || dependencies['nest']) return 'node';
    return 'javascript';
  } catch (error) {
    console.warn(
      chalk.yellow(`Warning: Could not detect project type: ${error.message}`)
    );
    return 'javascript';
  }
};
