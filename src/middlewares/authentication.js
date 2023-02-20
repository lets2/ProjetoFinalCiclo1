export function authenticate(req, res, next) {
    /* below a example of authenticate, but the correct place is header of request
    if (req.body.password !== 123) {
        res.status(403).json({ status: "senha incorreta" }); // forbidden
        return;
    }
    */
    next();
}
