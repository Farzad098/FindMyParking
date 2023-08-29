const sqlite3 = require('sqlite3').verbose();

// Open the database (or create if it doesn't exist)
const db = new sqlite3.Database('userdata.db');

// Create the 'users' table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT
        )
    `);
});

module.exports = db;
