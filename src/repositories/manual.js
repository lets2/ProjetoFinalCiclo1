const pool = require("./db-pool.js");

const bcrypt = require("bcrypt");
const jwtLib = require("jsonwebtoken");

async function cadastroManual(username, plainTextPassword = "123") {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10);

    pool.query("INSERT INTO users (username, passwordHash) VALUES ($1, $2)", [
        username,
        passwordHash,
    ]);
}

///--------------------------

async function cadastroManualNossoDB(
    username,
    plainTextPassword = "11111",
    email = "gabi@mail.com",
    type_id = "2"
) {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10);

    pool.query(
        "INSERT INTO users (name, password,email,type_id) VALUES ($1, $2,$3,$4)",
        [username, passwordHash, email, type_id]
    );
}
//essa funcção faria cadastro, está funcionando
//cadastroManualNossoDB("gabriela");

async function login(username, plainTextPassword) {
    const dbPasswordHash = await pool.query(
        "SELECT password FROM users WHERE name = $1",
        [username]
    );
    const hashOficial = dbPasswordHash.rows[0].password;
    const result = await bcrypt.compare(plainTextPassword, hashOficial);
    //const result = true;
    if (result) {
        console.log(
            "DEU TRUE, LOGO A SENHA CONFERE, TOMA TEU COOKIE",
            hashOficial
        );
        ///const jwt = jwtLib.sign({ username }, "minha senha aqui"); // process.env.JWTSECRET
        ///res.cookie("session", jwt);
        ///res.status(200).json({});
    } else {
        console.log("DEU FALSE, ALGO DE ERRADO!", hashOficial);
        // res.status(403).json({});
    }
}

login("gabriela", "11111");
login("letonio", "12345");
