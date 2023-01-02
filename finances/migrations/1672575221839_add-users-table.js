/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                email VARCHAR(40) NOT NULL,
                username VARCHAR(240) NOT NULL.
                monthly_salary integer NOT NULL DEFAULT 0,
                currency VARCHAR(40) NOT NULL DEFAULT 'vnd',
                phone INTEGER
            )`
    )
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE users
        `)
};
