const jwtLib = require("jsonwebtoken");

function authenticate(req, res, next) {
    try {
        const decodedJwt = jwtLib.verify(
            req.cookies.session,
            process.env.JWT_SECRET
        );

        next();
    } catch (err) {
        console.log("[ERROR] AUTHENTICATE:", err);
        res.status(403).json({ message: "Acesso proibido!" });
    }
}

module.exports = authenticate;
