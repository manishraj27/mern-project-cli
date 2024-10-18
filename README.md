<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# MERN Project Generator CLI
> **Generate a complete MERN stack project with a single command!** 🚀

![npm](https://img.shields.io/npm/dt/mern-project-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge)
![npm](https://img.shields.io/npm/dw/mern-project-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)

**MERN Project Generator CLI** is a powerful command-line tool designed to jumpstart your MERN (MongoDB, Express, React, Node.js) stack projects. With just one command, you can scaffold a complete project structure for both backend and frontend, following best practices and including essential configurations.

## Key Features

- **Full MERN Stack Setup**: Generate both backend and frontend projects in one go.
- **Best Practices Built-in**: The generated projects follow industry-standard best practices for MERN stack development.
- **Customizable**: Easy to extend and customize to fit your specific project needs.
- **Instant Development Ready**: Start coding your application logic immediately after generation.

## Installation

To use the CLI effeciently, run use(`npm`):

```bash
npm install -g mern-project-cli
```

## Usage

To create a new MERN project, run:

```bash
mern-project-cli your-project-name
```

Replace `your-project-name` with your desired project name.

## Generated Project Structure

The CLI generates the following structure:

```
your-project-name/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── .gitignore
│   ├── constants.js
│   ├── package.json
│   ├── README.md
│   └── server.js
└── frontend/
    ├── (Create React App structure)
    └── .env.example
```

## Features

### Backend

- Express.js server setup
- MongoDB connection ready (using Mongoose)
- Environment variable configuration
- Basic error handling
- Modular architecture

### Frontend

- Create React App setup
- Environment variable configuration

## Getting Started

After generating your project:

1. Navigate to the backend directory:
   ```bash
   cd your-project-name/backend
   ```

2. Create a `.env` file based on `.env.example` and configure your environment variables.

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. In a new terminal, navigate to the frontend directory:
   ```bash
   cd your-project-name/frontend
   ```
5. Start the React development server:
   ```bash
   npm start
   ```

## Customization

Feel free to modify the generated files to fit your specific project requirements. The structure is designed to be easily extendable.

## Requirements

- Node.js 14.x or higher

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Made with ❤️ by Manish Raj</p>
  <p>
    <a href="https://manishraj.me/" target="_blank">Portfolio</a>&nbsp;
    <a href="https://github.com/manishraj27" target="_blank">GitHub</a>&nbsp;
    <a href="https://www.linkedin.com/in/manishraj27" target="_blank">LinkdIn</a>&nbsp;
    <a href="https://x.com/manish_rraaj" target="_blank">Twitter</a>&nbsp;
  </p>
</div>