const db = require('../config/database');

class User {
  static create(email, hashedPassword, role = 'user') {
    const stmt = db.prepare(`
      INSERT INTO users (email, password, role) 
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(email, hashedPassword, role);
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static getAll() {
    const stmt = db.prepare('SELECT id, email, role, createdAt FROM users');
    return stmt.all();
  }
}

module.exports = User;
