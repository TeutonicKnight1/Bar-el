const ordersService = require("../services/OrdersService");

class OrdersController {

    async getAll(req, res) {
        const result = await ordersService.getAll();

        res.json(result)
    }

    async getOne(req, res) {
        const result = await ordersService.getOne(req.params.id);

        res.json(result)
    }

    async create(req, res) {
        const result = await ordersService.create(req.body);

        res.json(result)
    }

    async update(req, res) {
        const order = await ordersService.getOne(req.params.id);
        
        const result = await ordersService.update(order.id, req.body);

        res.json(result)
    }
}

module.exports = new OrdersController();