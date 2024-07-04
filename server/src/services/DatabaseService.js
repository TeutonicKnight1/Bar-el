const mysql = require('mysql2');

const { config } = require('../../config');


class DatabaseService {

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'barel_client',
      password: 'password1235',
      database: 'barel_database'
    });
  }

  async connect() {

    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error('Ошибка подключения к базе данных:', err);
          reject(err)
          return;
        }
        console.log('Подключение к базе данных успешно установлено.');
        resolve()
      });
    })
  }

}

module.exports = new DatabaseService();