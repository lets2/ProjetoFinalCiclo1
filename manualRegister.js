const bcrypt = require("bcrypt");

// register new users
async function testRegisterUser(username, plainTextPassword) {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10);
}

testRegisterUser("Lets", "123");
