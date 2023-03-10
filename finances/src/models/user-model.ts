import pool from '../pool';
import toCamelCase from './util/to-camel-case';


type UserProps = {
  email: string,
  monthlySalary: number,
  username: string,
  currency: string,
  phone: string
}

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
  static async insertNewUser(email: string, username: string) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;`,
      [email, username]
    );
    console.log(rows);
    return toCamelCase(rows)[0];
  }
  static async count() {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users`)
    return toCamelCase(rows)[0]
  }

  static async updateExistingUser(user: UserProps) {
    const { rows } = await pool.query(`
      UPDATE users 
      SET monthly_salary = $1,
       currency = $2,
       phone = $3
      WHERE email = $4
      RETURNING *;`, [user.monthlySalary, user.currency, user.phone, user.email])
    return toCamelCase(rows)[0]
  }
}

export { User };
