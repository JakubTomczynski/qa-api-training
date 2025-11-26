const Database = require('better-sqlite3');
const path = require('path');

// Use in-memory database for production (cloud deployment) or file-based for development
// Note: In-memory is intentional for this QA training API - data resets on restart,
// which is acceptable for a practice/learning environment and simplifies deployment
const isProduction = process.env.NODE_ENV === 'production';
const dbPath = isProduction ? ':memory:' : path.join(__dirname, '..', '..', 'database.sqlite');
const db = new Database(dbPath);

console.log(`Database mode: ${isProduction ? 'in-memory (production)' : 'file-based (development)'}`);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize tables
const initDatabase = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'on-hold')),
      createdBy INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('Database initialized successfully');
};

// Initialize on module load
initDatabase();

module.exports = db;
