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

    async getLastOrderByTableNumber(tableNumber) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM orders
                WHERE tableNumber = ?
                ORDER BY idorder DESC
                LIMIT 1;
            `;
            database.connection.query(query, [tableNumber], (err, results) => {
                if (err) {
                    return reject(err);
                }

                // Если результат найден, возвращаем первый (и единственный) элемент из массива результатов
                resolve(results[0]);
            });
        });
    }

    async update(id, orderData) {
        try {
            const { tableNumber, ordersBody, receipt, netProfit, createdAt } = orderData;

            const order = {
                tableNumber,
                ordersBody: JSON.stringify(ordersBody), // Преобразуем объект в строку JSON
                receipt: receipt,
                netProfit: netProfit,
                createdAt: createdAt
            };

            return new Promise((resolve, reject) => {
                const query = `
                UPDATE orders
                SET tableNumber = ?, ordersBody = ?, receipt = ?, netProfit = ?, createdAt = ?
                WHERE idorder = ?
                `;
                const values = [order.tableNumber, order.ordersBody, order.receipt, order.netProfit, order.createdAt, id];

                database.connection.query(query, values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            database.connection.query(`
                DELETE FROM orders
                WHERE idorder = ?
            `, [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = new OrdersService();