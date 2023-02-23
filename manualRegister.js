const bcrypt = require("bcrypt");

// register new users
async function testRegisterUser(username, plainTextPassword) {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10);
    console.log("FAZENDO TEST DE HASH:");
    console.log("MEU HASH:");
    console.log(passwordHash);
    console.log("MEU HASH:");
}

testRegisterUser("Lets", "123");
