const db = require('../db');

class Teacher {

  // teacher model
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toLocaleString('en-US', { hour12: true, timeZone: 'America/New_York' });
  }

  // teacher model db calls

  // find teacher by id
  static async findById(id) {
    const query = 'SELECT 1 FROM teachers WHERE id = $1';
    try {
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error(`Teacher with id ${id} not found`);
      }

      return new Teacher(...result.rows[0]);

    } catch (error) {

      console.error('Error finding teacher by id:', error);
      throw new Error('Error finding teacher by id', error);
    }
  }

  // find teacher by email
  static async findByEmail(email) {
    const query = 'SELECT 1 FROM teachers WHERE email = $1';
    try {
      const result = await db.query(query, [email]);

      if (result.rows.length === 0) {
        throw new Error(`Teacher with email ${email} not found`);
      }

      return new Teacher(...result.rows[0]);

    } catch (error) {

      console.error('Error finding teacher by email:', error);
      throw new Error('Error finding teacher by email', error);
    }
  }

  // find all teachers
  static async findAll() {
    const query = 'SELECT id, first_name, last_name, email FROM teachers ORDER BY created_at DESC LIMIT 10';

    try {
      const result = await db.query(query);

      return result.rows.map(row => new Teacher(...row));
    } catch (error) {
      console.error('Error finding all teachers:', error);
      throw new Error('Error finding all teachers', error);
    }
  }

  // create new teacher
  static async create(firstName, lastName, email, password) {
    const query = 'INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
      const result = await db.query(query, [firstName, lastName, email, password]);

      return new Teacher(...result.rows[0]);
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw new Error('Error creating teacher', error);
    }

  }

  // update teacher
  static async update(id, firstName, lastName, email, password) {
    const query = 'UPDATE teachers SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';

    try {
      const result = await db.query(query, [firstName, lastName, email, password, id]);

      if (result.rows.length === 0) {
        throw new Error(`Teacher with id ${id} not found`);
      }

      return new Teacher(...result.rows[0]);
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw new Error('Error updating teacher', error);
    }
  
  }

  // delete teacher
  static async delete(id) {
    const query = 'DELETE FROM teachers WHERE id = $1 RETURNING *';
    try {
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error(`Teacher with id ${id} not found`);
      }

      return new Teacher(...result.rows[0]);
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw new Error('Error deleting teacher', error);
    }
  }
}
