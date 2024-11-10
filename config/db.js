const knex = require('knex');
require('dotenv').config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PROD} = process.env;

console.log(PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PROD);


module.exports = {
    db: knex({
        client: 'pg',
        connection: {
            host: PGHOST,
            database: PGDATABASE,
            user: PGUSER,
            password:  PGPASSWORD,
            port: PGPORT,
            ssl:PROD? true : {rejectUnauthorized:false},
        },

    })
}