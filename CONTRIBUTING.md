# Contributing to MERN Project Generator CLI

Thank you for your interest in contributing to MERN Project Generator CLI! We're excited to welcome contributors who want to help improve this tool for the developer community. This document provides guidelines and instructions for contributing.

## 📝 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. Please:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/your-username/mern-project-cli.git
cd mern-project-cli
```

3. Install dependencies:

```bash
npm install
```

4. Create a new branch for your feature/fix:

```bash
git checkout -b feature/your-feature-name
```

## Development Process

1. **Set up your development environment**

   - Ensure you have Node.js (v14 or higher) installed
   - Install all dependencies using `npm install`
   - Link the package locally using `npm link`

2. **Make your changes**

   - Write clear, concise commit messages
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**

   ```bash
   npm test                 # Run tests
   npm run lint             # Check code
   npm run lint:fix         # Fix The style
   ```

4. **Test the CLI locally [Your Commands]**

   ```bash
   devcli --version        # Check if CLI is working

   ```

## Pull Request Process

1. **Update your fork**

   ```bash
   git remote add upstream https://github.com/manishraj27/mern-project-cli.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Create your PR**

   - Ensure your PR description clearly describes the problem and solution
   - Include the relevant issue number if applicable
   - Update the README.md if any changes affect user-facing functionality

3. **PR Checklist**
   - [ ] Tests pass
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] Commit messages are clear
   - [ ] Changes are in a single commit (if possible)
   - [ ] Branch is up to date with main

## Reporting Bugs

When reporting bugs, please include:

1. Your operating system name and version
2. Node.js version
3. Relevant dependencies and their versions
4. Step by step description of how to reproduce the issue
5. What you expected would happen
6. What actually happens

Use the GitHub Issues template for bug reports.

## Feature Requests

We welcome feature requests! Please provide:

1. Clear and detailed description of the feature
2. Use cases for the feature
3. Any potential implementation ideas you have
4. Whether you'd be interested in implementing it yourself

Use the GitHub Issues template for feature requests.

## Style Guidelines

### Code Style

- Use ES6+ features where appropriate
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and modular

### Commit Messages

Format: `type(scope): description`

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

Example:

```
feat(cli): add support for custom MongoDB port configuration
```

## Community

- Join our discussions in GitHub Issues
- Star the repository if you find it helpful

## Questions?

If you have any questions about contributing, please:

1. Check existing GitHub Issues
2. Create a new Issue if your question hasn't been addressed
3. Reach out to the maintainers

Thank you for contributing to MERN Project Generator CLI! 🚀

---

## License

By contributing to MERN Project Generator CLI, you agree that your contributions will be licensed under the MIT License.
