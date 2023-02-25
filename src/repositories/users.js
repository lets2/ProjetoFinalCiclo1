const pool = require("./db-pool.js");

//const bcrypt = require("bcrypt");
//const jwtLib = require("jsonwebtoken");

const TAG = "users Repository: ";

exports.login = async (_username, _plainTextPassword) => {
    // Performs the query with filtering/sorting
    try {
        const dbPasswordHash = await pool.query(
            "SELECT password FROM users WHERE name = $1",
            [_username]
        );

        return dbPasswordHash.rows;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.registerNewAdm = async (_username, _dbPasswordHash, _email) => {
    // Performs the query with filtering/sorting
    try {
        const type_id = "2"; //TIPO 2 = ADM, como só vai ter adm, fixei aqui o valor
        const query = await pool.query(
            "INSERT INTO users (name, password,email,type_id) VALUES ($1, $2,$3,$4) RETURNING *",
            [_username, _dbPasswordHash, _email, type_id]
        );

        //// return dbPasswordHash.rows;
        if (query.rows[0]) return query.rows; //retorna informações do usuario criado
        throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};
