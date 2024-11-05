import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

export default function addJWTAuthCommand(program) {
  program
    .command('add-jwt-auth')
    .description('Add JWT authentication boilerplate')
    .action(async () => {
      const currentDir = process.cwd();
      const isInBackend = path.basename(currentDir) === 'backend';
      const backendDir = isInBackend
        ? currentDir
        : path.join(currentDir, 'backend');

      // Check if the backend directory exists
      if (!fs.existsSync(backendDir)) {
        console.error(
          chalk.red(
            '❌ Backend directory not found. Make sure you are in the correct project folder.'
          )
        );
        return;
      }

      // Create necessary folders
      const controllerDir = path.join(backendDir, 'controllers');
      const middlewareDir = path.join(backendDir, 'middlewares');
      const modelDir = path.join(backendDir, 'models');
      const routeDir = path.join(backendDir, 'routes');
      const utilsDir = path.join(backendDir, 'utils');

      // Create directories if they do not exist
      fs.ensureDirSync(controllerDir);
      fs.ensureDirSync(middlewareDir);
      fs.ensureDirSync(modelDir);
      fs.ensureDirSync(routeDir);
      fs.ensureDirSync(utilsDir);

      // Generate authController.js
      const authControllerCode = `
// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();
  
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'my_secret', { expiresIn: '1h' });
  res.json({ token });
};
`;

      // Write authController.js
      fs.outputFileSync(
        path.join(controllerDir, 'authController.js'),
        authControllerCode
      );
      console.log(chalk.green('✅ authController.js created successfully'));

      // Generate auth middleware
      const authMiddlewareCode = `
// authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'my_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
`;

      // Write authMiddleware.js
      fs.outputFileSync(
        path.join(middlewareDir, 'authMiddleware.js'),
        authMiddlewareCode
      );
      console.log(chalk.green('✅ authMiddleware.js created successfully'));

      // Generate user model
      const userModelCode = `
// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
`;

      // Write userModel.js
      fs.outputFileSync(path.join(modelDir, 'userModel.js'), userModelCode);
      console.log(chalk.green('✅ userModel.js created successfully'));

      // Generate auth routes
      const authRoutesCode = `
// authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController.js');
const { authenticateToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

module.exports = router;
`;

      // Write authRoutes.js
      fs.outputFileSync(path.join(routeDir, 'authRoutes.js'), authRoutesCode);
      console.log(chalk.green('✅ authRoutes.js created successfully'));

      // Update server.js to include auth routes
      const serverFilePath = path.join(backendDir, 'server.js');

      // Check if server.js exists
      if (fs.existsSync(serverFilePath)) {
        // Read existing content of server.js
        const serverContent = fs.readFileSync(serverFilePath, 'utf8');

        // Check if auth routes are already included
        if (
          !serverContent.includes(
            "const authRoutes = require('./routes/authRoutes.js')"
          )
        ) {
          // Append the auth routes to the existing server.js content
          const updatedContent = `${serverContent}

const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes);`;

          fs.writeFileSync(serverFilePath, updatedContent);
          console.log(chalk.green('✅ auth routes added to server.js'));
        } else {
          console.log(
            chalk.yellow('⚠️ Auth routes already imported in server.js')
          );
        }
      } else {
        console.error(
          chalk.red(
            '❌ server.js not found. Make sure you are in the correct directory.'
          )
        );
      }

      // Install necessary packages
      try {
        console.log(chalk.blue('🔧 Installing required packages...'));
        execSync('npm install bcryptjs jsonwebtoken', {
          stdio: 'inherit',
          cwd: backendDir,
        });
        console.log(chalk.green('✅ Required packages installed successfully'));
      } catch {
        console.error(chalk.red('❌ Failed to install required packages'));
      }

      // Final success message with next steps
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(
        chalk.white('1. Update your .env file with a secure JWT_SECRET.')
      );
      console.log(
        chalk.white('2. Start the server and test the authentication routes:')
      );
      console.log(
        chalk.white('   - POST /api/auth/register: Register a new user')
      );
      console.log(
        chalk.white('   - POST /api/auth/login: Log in and get the JWT token')
      );
      console.log(
        chalk.white(
          '   - GET /api/auth/protected: Access the protected route with the JWT token\n' +
            '     (Make sure to include the token in the Authorization header as "Bearer <token value>" and key as "Authorization")'
        )
      );
      console.log(
        chalk.white(
          '3. Customize the authentication logic and routes as needed for your application.'
        )
      );
    });
}
