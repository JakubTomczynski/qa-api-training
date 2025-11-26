const db = require('../config/database');

class Project {
  static create(name, description, status = 'active', createdBy) {
    const stmt = db.prepare(`
      INSERT INTO projects (name, description, status, createdBy) 
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, description, status, createdBy);
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare(`
      SELECT p.*, u.email as creatorEmail 
      FROM projects p 
      LEFT JOIN users u ON p.createdBy = u.id 
      WHERE p.id = ?
    `);
    return stmt.get(id);
  }

  static getAll() {
    const stmt = db.prepare(`
      SELECT p.*, u.email as creatorEmail 
      FROM projects p 
      LEFT JOIN users u ON p.createdBy = u.id 
      ORDER BY p.createdAt DESC
    `);
    return stmt.all();
  }

  static update(id, name, description, status) {
    const stmt = db.prepare(`
      UPDATE projects 
      SET name = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    stmt.run(name, description, status, id);
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

module.exports = Project;
