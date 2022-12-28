import pool from '../pool';
import toCamelCase from './util/to-camel-case';

class User {
  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }
  static async findByEmail(email: string) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    return toCamelCase(rows)[0];
  }
  static async insert(email: string) {
    const { rows } = await pool.query(
      `INSERT INTO users (email) VALUES ($1) RETURNING *;`,
      [email]
    );
    console.log(rows);
    return toCamelCase(rows)[0];
  }
}

export { User };
