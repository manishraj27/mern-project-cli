// Entry point of the backend server
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('${projectName.toUpperCase()} BACKEND API');
});

// TODO: Add routes and middleware

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:\${PORT} 🚀`);
});