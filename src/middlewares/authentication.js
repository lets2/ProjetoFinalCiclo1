///export function authenticate(req, res, next) {
/* below a example of authenticate, but the correct place is header of request
    if (req.body.password !== 123) {
        res.status(403).json({ status: "senha incorreta" }); // forbidden
        return;
    }
    */
//    next();
//}
const jwtLib = require("jsonwebtoken");

function authenticate(req, res, next) {
    try {
        const decodedJwt = jwtLib.verify(
            req.cookies.session,
            "minha senha aqui"
        ); // process.env.JWTSECRET
        console.log("DECODEDJWT", decodedJwt);
        next();
    } catch (err) {
        console.log("ERRO DO AUTHENTICATE:", err);
        res.status(403).json({ message: "Acesso proibido!" });
    }
}

module.exports = authenticate;
