import fs from 'fs';
import path from 'path';

export default function detectProjectType(dirPath) {
  const packageJsonPath = path.join(dirPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      if (deps.react) return 'react';
      if (deps.vue) return 'vue';
      if (deps.typescript) return 'typescript';
      if (deps.express || deps.koa || deps.fastify) return 'node';
    } catch (error) {
      console.error('Error reading or parsing package.json:', error);
    }
  }
  return 'javascript';
}
