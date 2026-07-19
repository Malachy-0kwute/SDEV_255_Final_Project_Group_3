const db = require('../db');

class Student {

  // student model
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toLocaleString('en-US', { hour12: true, timeZone: 'America/New_York' });
  }

  // student model db calls

  // find student by id
  static async findById(id) {
    const query = 'SELECT 1 FROM students WHERE id = $1';
    try {
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error(`Student with id ${id} not found`);
      }

      return new Student(...result.rows[0]);
    } catch (error) {
      console.error('Error finding student by id:', error);
      throw new Error('Error finding student by id', error);
    }
  }

  // find student by email
  static async findByEmail(email) {
    const query = 'SELECT 1 FROM students WHERE email = $1';
   
    try {
      const result = await db.query(query, [email]);

      if (result.rows.length === 0) {
        throw new Error(`Student with email ${email} not found`);
      }

      return new Student(...result.rows[0]);
    } catch (error) {
      console.error('Error finding student by email:', error);
      throw new Error('Error finding student by email', error);
    }
  }

  // find all students
  static async findAll() {
    const query = 'SELECT id, first_name, last_name, email FROM students ORDER BY created_at DESC LIMIT 10';

    try {
      const result = await db.query(query);

      return result.rows.map(row => new Student(...row));
    } catch (error) {
      console.error('Error finding all students:', error);
      throw new Error('Error finding all students', error);
    }
  }

  // create new student
  static async create(firstName, lastName, email, password) {
    const query = 'INSERT INTO students (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    try {
      const result = await db.query(query, [firstName, lastName, email, password, this.createdAt]);

      return new Student(...result.rows[0]);
    } catch (error) {
      console.error('Error creating student:', error);
      throw new Error('Error creating student', error);
    }
  }

  // update student
  static async update(id, firstName, lastName, email, password) {
    const query = 'UPDATE students SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';

    try {
      const result = await db.query(query, [firstName, lastName, email, password, id]);

      if (result.rows.length === 0) {
        throw new Error(`Student with id ${id} not found`);
      }

      return new Student(...result.rows[0]);
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error('Error updating student', error);
    }
  }

  // delete student
  static async delete(id) {
    const query = 'DELETE FROM students WHERE id = $1 RETURNING *';

    try {
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error(`Student with id ${id} not found`);
      }

      return new Student(...result.rows[0]);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error('Error deleting student', error);
    }
  }
}