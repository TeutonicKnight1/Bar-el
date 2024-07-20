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
        try {
            const orderByTableNumber = await ordersService.getLastOrderByTableNumber(req.body.numberOfTable);
            if (!orderByTableNumber) {
                return res.status(404).json({ message: "Order not found for the specified table number" });
            }

            const result = await ordersService.update(orderByTableNumber.idorder, req.body.order);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new OrdersController();