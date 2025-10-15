# 🚀 MERN Project CLI - Quick Start

> Create production-ready MERN stack projects in seconds!

## ⚡ Install

```bash
npm install -g mern-project-cli
```

## 🛠️ Essential Commands

### Create Full MERN Project
```bash
devcli create my-app                    # Complete MERN stack
devcli create my-backend --backend      # Backend only
```

### Create Frontend Only
```bash
devcli create-frontend my-app --shadcn  # React + Shadcn UI + Tailwind
devcli create-frontend my-app --vite    # React + Vite + Tailwind  
```

### Database & Schema
```bash
devcli mongodb-connect                  # Connect MongoDB
devcli mongoose-schema User name:String email:String password:String
```

### Add Features
```bash
devcli add-redux --init                 # Setup Redux
devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"
devcli add-jwt-auth                     # JWT Authentication
devcli add-eslint                       # ESLint + Prettier
```

### Docker & Deployment
```bash
devcli init-dockerfiles                 # Generate Docker files
devcli deploy --vercel                  # Deploy to Vercel
```

## 🏃 Quick Example

```bash
# 1. Create project
devcli create my-blog-app

# 2. Start backend
cd my-blog-app/backend
npm run dev                             # Runs on http://localhost:5000

# 3. Start frontend (new terminal)
cd ../frontend  
npm start                               # Runs on http://localhost:3000

# 4. Connect database
cd ../backend
devcli mongodb-connect

# 5. Create schema
devcli mongoose-schema Post title:String content:String author:String

# 6. Setup Redux (in frontend)
cd ../frontend
devcli add-redux --init
devcli add-redux --slice posts --actions="addPost,deletePost" --state="posts:array,loading:boolean"
```

## 📋 Requirements

- **Node.js**: 14.x+
- **npm**: 6.x+  
- **MongoDB**: Local or remote

## 🔧 Environment Setup

**Backend (.env)**
```env
PORT=5000
DB_URI=mongodb://localhost:27017/my_blog_app_db
JWT_SECRET=your_jwt_secret_here
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🐳 Docker Usage

```bash
# After creating project
devcli init-dockerfiles
docker-compose up                       # Starts backend, frontend & MongoDB
```

## 📖 Need More Details?

- **[Complete Documentation](./README.md)** - Full feature guide
- **[NPM Package](https://www.npmjs.com/package/mern-project-cli)** - Package info
- **[Website](https://devcli.vercel.app)** - Project website

## 🆘 Quick Troubleshooting

- **Command not found**: Run `npm install -g mern-project-cli`
- **Port errors**: Check if ports 3000/5000 are available
- **MongoDB issues**: Ensure MongoDB is running locally
- **Permission errors**: Use `sudo` on Linux/Mac if needed

---

**Ready to build? Start with `devcli create my-awesome-app` 🚀**