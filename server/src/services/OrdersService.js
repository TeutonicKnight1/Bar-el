const database = require("./DatabaseService")

class OrdersService {

    async getAll() {

        return new Promise((resolve, reject) => {

            database.connection.query(`
                SELECT * from orders
            `, (err, result) => {

                if (err) {
                    reject(err)
                }

                resolve(result)

            })

        })

    }

    async getOne(id) {

        return new Promise((resolve, reject) => {

            database.connection.query(`
                SELECT * from orders
                WHERE id = ?
            `, [id], (err, result) => {

                if (err) {
                    reject(err)
                }

                resolve(result)



            })

        })


    }

    async create(orderData) {
        return new Promise((resolve, reject) => {
            const { tableNumber, ordersBody, receipt, netProfit, createdAt } = orderData;

            const order = {
                tableNumber,
                ordersBody: JSON.stringify(ordersBody), // Преобразуем объект в строку JSON
                receipt: receipt,
                netProfit: netProfit,
                createdAt: createdAt
            };

            database.connection.query(`
                INSERT INTO orders
                SET ?
            `, order, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    async update(id, orderData) {
        const { tableNumber, ordersBody, receipt, netProfit, createdAt } = orderData;

        const order = {
            tableNumber,
            ordersBody: JSON.stringify(ordersBody), // Преобразуем объект в строку JSON
            receipt: receipt,
            netProfit: netProfit,
            createdAt: createdAt
        };

        return new Promise((resolve, reject) => {
            database.connection.query(`
                UPDATE orders
                SET ?
                WHERE id = ?
            `, orderData, id, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}

module.exports = new OrdersService();