const userService = require("../services/UsersService")

class UsersController {

    async getHello(req, res) {

        console.log(req.user)

        res.json({
            "result": "hello"
        })

    }

    async login(req, res) {

        try {

            const { userlogin, password } = req.body;

            if(!userlogin) return res.json({"body error": "userlogin does not provided"})
            if(!password) return res.json({"body error": "password does not provided"})
    
            const result = await userService.login(userlogin, password);
    
            if(!result) {
                res.sendStatus(400)
            }

            res.json(result)

        } catch(e) {

            res.sendStatus(400)

            console.log(e);

        }

    }

    async register(req, res) {

        try {

            const { userlogin, password } = req.body;

            if(!userlogin) return res.json({"body error": "userlogin does not provided"})
            if(!password) return res.json({"body error": "password does not provided"})
    
            const result = await userService.register(userlogin, password);
    
            if(!result) {
                res.sendStatus(400)
            }

            res.json({
                result: 'ok'
            })

        } catch(e) {

            res.sendStatus(400)

            console.log(e);

        }

    }

}

module.exports = new UsersController();