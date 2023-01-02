import pool from "../pool";
import { randomBytes } from "crypto";
import migrate from "node-pg-migrate";
import format from "pg-format";

const TEST_OPTS = {
  host: "localhost",
  port: 5432,
  database: "finance-app-test",
  user: "postgres",
  password: "8ecb5d2fd32f4c9899449e640e18fe89",
};

class Context {
  static async build() {
    const roleName = "a" + randomBytes(4).toString("hex");

    await pool.connect(TEST_OPTS);

    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    await pool.close();

    await migrate({
      migrationsTable: roleName,
      schema: roleName,
      direction: "up",
      log: () => { },
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        port: 5432,
        database: "finance-app-test",
        user: roleName,
        password: roleName,
      },
    });

    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "finance-app-test",
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(public roleName: string) {
    this.roleName = roleName;
  }

  async reset() {
    return pool.query(`
        DELETE FROM users;
       `)
  }

}


export default Context;
