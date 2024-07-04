const database = require("./DatabaseService")

class OrdersService {

    async getAll() {

        return new Promise((resolve, reject) => {

            database.connection.query(`
                SELECT * from orders
            `, (err, result) => {

                if(err) {
                    reject(err)
                }

                resolve(result)

            })

        })

    }

}

module.exports = new OrdersService();