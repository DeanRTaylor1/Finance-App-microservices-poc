import pool from '../pool';
import toCamelCase from './util/to-camel-case';

class UserRepo {
  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }
}

export { UserRepo };
