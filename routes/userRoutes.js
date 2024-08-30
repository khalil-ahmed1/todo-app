// routes/userRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db, bcrypt) => {
  // Register User
  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) return res.status(500).json({ message: 'Error registering user' });
        res.status(200).json({ message: 'User registered successfully' });
      });
    });
  });

  // Login User
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        req.session.userId = user.id;
        res.redirect("/index");
        // res.status(200).json({ message: 'Logged in successfully' });
      });
    });
  });

  return router;
};
