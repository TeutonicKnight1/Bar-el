const ordersService = require("../services/OrdersService");

class OrdersController {

    async getAll(req, res) {
        const result = await ordersService.getAll();

        res.json(result)
    }
}

module.exports = new OrdersController();