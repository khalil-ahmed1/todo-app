// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'khalil',
  database: 'todo_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Session Configuration
app.use(
  session({
    secret: 'dsjkfabasdvjdjksabhvflfkchgkg',  // your-secret-key
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/index', (req, res) => {
  if (req.session.userId) {
    res.render('index');
  } else {
    res.redirect('/login');
  }
});

app.use('/api/todos', todoRoutes(db));
app.use('/api/users', userRoutes(db, bcrypt));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
