const authService = require("../services/UsersService")

const authOnly = async (req, res, next) => {
    try {
        if (!req.body.token) {
            return res.sendStatus(401)
        }
        const user = authService.getUserByToken(req.body.token);
        if (!user) {
            return res.sendStatus(401)
        }
        req.user = user

        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(401)
    }
}

module.exports = authOnly