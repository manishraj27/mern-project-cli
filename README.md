# 🚀 MERN Project Generator CLI: Create Full-Stack Projects in a Flash ⚡

Say goodbye to hours of setup! **MERN Project Generator CLI** lets you create production-ready MERN stack projects in just **seconds**. With pre-configured setups and instant MongoDB integration, you can skip the boring part and jump straight into building your next big thing. Whether you're a beginner or an experienced dev, this tool is designed to **save time** and keep you focused on what you do best—**coding**!

---

## 🌐 Links You’ll Need  
- **NPM Package**: [MERN Project CLI](https://www.npmjs.com/package/mern-project-cli)  
- **Website**: [devcli.vercel.app](https://devcli.vercel.app)

![NPM Total Downloads](https://img.shields.io/npm/dt/mern-project-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge)  
![NPM Weekly Downloads](https://img.shields.io/npm/dw/mern-project-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)  
[![Node.js Package](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/manishraj27/mern-project-cli/actions/workflows/npm-publish.yml)

---

## ✨ Why You’ll Love It  

- **One Command Setup**: Generate frontend and backend projects instantly!  
- **MongoDB on Autopilot**: Zero config required to connect your app with MongoDB.  
- **Pre-Configured Structure**: Follow best practices right out of the box.  
- **Redux & Docker Support**: Easily add state management and containerization.  
- **Hot-Reload Everywhere**: Develop faster with real-time updates for both backend and frontend.  

---

## ⚡ Quickstart: How to Use It  

Here’s how to get started:

### Step 1: Install the CLI Tool Globally  
```bash
npm install -g mern-project-cli
```

### Step 2: Create Your Project  
```bash
devcli create my-awesome-app
```

### Step 3: Start Development  
For Backend:  
```bash
cd my-awesome-app/backend  
npm run dev
```

For Frontend:  
```bash
cd my-awesome-app/frontend  
npm start
```

Boom 💥! You now have a complete MERN app running on your local machine! 🎉

---

## 📑 Features That Make Your Life Easier  

1. **Generate Frontend Projects** with `Vite + Tailwind CSS` or **Shadcn UI**.  
2. **Instant MongoDB Setup**: Auto-connect with just one command.  
3. **Mongoose Schema Generator**: Skip manual schema writing—generate with ease!  
4. **Redux Store Integration**: Add slices and actions without breaking a sweat.  
5. **Pre-configured Docker Support**: Get Dockerfiles and `docker-compose.yml` ready to roll.  

---

## 🛠️ Essential Commands  

### 1. **Create a New MERN Project**  
```bash
devcli create <project_name>
```
This sets up a full-stack project with separate **frontend** and **backend** folders.

### 2. **Connect MongoDB**  
```bash
devcli mongodb-connect
```
Or specify a custom database name:  
```bash
devcli mongodb-connect --project my-custom-db
```

### 3. **Generate Mongoose Schema**  
```bash
devcli mongoose-schema User name:String email:String password:String
```
Creates a `User` model in the backend’s `models/` directory.

### 4. **Add Redux State Management**  
Initialize Redux:  
```bash
devcli add-redux --init
```
Create a Redux slice:  
```bash
devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"
```

### 5. **Create Frontend Project with Shadcn UI or Vite**  
With Shadcn UI:  
```bash
devcli create-frontend my-app --shadcn
```
With Vite + Tailwind CSS:  
```bash
devcli create-frontend my-app --vite
```

---

## 🐳 Docker Support: Go Full DevOps  

Easily generate Docker configurations:  
```bash
devcli init-dockerfiles
```
This command creates:

- Dockerfiles for **backend** and **frontend**
- A `docker-compose.yml` to spin everything up in one go

To start the project with Docker:  
```bash
docker-compose up
```

---

## 🎯 Complete User Journey: From Zero to App Hero  

Let’s say you’re building a **blog app**. Here’s how easy it is with the MERN Project Generator CLI:

1. **Install the CLI**:  
   ```bash
   npm install -g mern-project-cli
   ```

2. **Create the Project**:  
   ```bash
   devcli create my-blog-app
   ```

3. **Set Up Backend**:  
   ```bash
   cd my-blog-app/backend  
   npm run dev
   ```

4. **Set Up Frontend**:  
   ```bash
   cd ../frontend  
   npm start
   ```

5. **Connect MongoDB**:  
   ```bash
   devcli mongodb-connect
   ```

6. **Generate Mongoose Schema**:  
   ```bash
   devcli mongoose-schema Blog title:String content:String author:String
   ```

7. **Initialize Redux**:  
   ```bash
   cd ../frontend  
   devcli add-redux --init
   ```

8. **Create Redux Slice**:  
   ```bash
   devcli add-redux --slice blog --actions="addPost,deletePost" --state="posts:array"
   ```

🚀 **Voila!** Your blog app is ready to conquer the world! 🌍

---

## 📦 Requirements  

- **Node.js**: Version 14.x or higher  
- **npm**: Version 6.x or higher  
- **MongoDB**: Local or remote installation  
- **Docker**: Optional, but recommended for smooth deployment

---

## 🌱 Contribute to the Project  

We believe in the power of **open-source**! Feel free to:

1. **Report Bugs**: Found a bug? Open an [issue](https://github.com/manishraj27/mern-project-cli/issues).  
2. **Submit Pull Requests**: Fork the repo, make changes, and contribute back.  
3. **Share Ideas**: We’re always open to suggestions on how to make this tool better!

---

## 📄 License  

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/manishraj27/mern-project-cli?tab=MIT-1-ov-file) for details.

---

## 🌟 Support the Project  

If you find MERN Project Generator CLI useful:

- ⭐ **Give it a star** on [GitHub](https://github.com/manishraj27/mern-project-cli)  
- 📦 Check it out on [NPM](https://www.npmjs.com/package/mern-project-cli)  
- 🗣️ **Share** it with other developers  

---

<div align="center">
  <h3>💻 Built with ❤️ by Manish Raj</h3>
  <p>
    <a href="https://manishraj.me/">Portfolio</a> •
    <a href="https://github.com/manishraj27">GitHub</a> •
    <a href="https://www.linkedin.com/in/manishraj27">LinkedIn</a> •
    <a href="https://x.com/manish_rraaj">Twitter</a>
  </p>
</div>

---

Happy coding, and may your projects be as seamless as this CLI tool! 🚀
