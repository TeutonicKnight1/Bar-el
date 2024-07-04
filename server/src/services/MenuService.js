const database = require("./DatabaseService");

class MenuService {
  async getAll() {

    return new Promise((resolve, reject) => {

      database.connection.query(`
            SELECT * from menu
        `, (err, result) => {

        if (err) {
          reject(err)
        }

        resolve(result)

      })

    })

  }
}

module.exports = new MenuService();
