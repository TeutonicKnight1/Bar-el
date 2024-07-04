const menuService = require("../services/MenuService");

class MenuController {

    async getAll(req, res) {
        const result = await menuService.getAll();

        res.json(result)
    }
}

module.exports = new MenuController();