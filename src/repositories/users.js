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
