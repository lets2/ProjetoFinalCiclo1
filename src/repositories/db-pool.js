/* const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

module.exports = pool;
*/

/*ACCESS TO ELEPHANTSQL SERVER*/
//*******************************/
//using  HOST WAY Funcionou também!!
//****************************** */
const { Pool } = require("pg");

const pool = new Pool({
    user: "ledlgubw",
    host: "babar.db.elephantsql.com",
    database: "ledlgubw",
    password: "pGF4Zmy1gMMan86NcyXPhViSepLgJSsm",
    port: "5432",
    max: 20,
});

module.exports = pool;
