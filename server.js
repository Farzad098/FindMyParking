const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Import the database setup from database.js
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Check if the email already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error checking email existence.');
      } else if (row) {
          res.status(400).send('Email already exists.');
      } else {
          // Email doesn't exist, proceed with insertion
          db.run(
              'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
              [name, email, password],
              (err) => {
                  if (err) {
                      console.error(err);
                      res.status(500).send('Error saving user data to the database.');
                  } else {
                      res.send('User data saved to the database.');
                  }
              }
          );
      }
  });
});
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error checking email existence.');
      } else if (!row) {
          res.status(401).send('Invalid email or password.');
      } else if (row.password !== password) {
          res.status(401).send('Invalid email or password.');
      } else {
        res.send({ success: true, userData: {name: row.name,id: row.id,email: row.email} });
      }
  });
});

// Start server on port 3001
app.listen(3001, function() {
    console.log(`Server running at http://127.0.0.1:3001/`);
});
