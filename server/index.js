const express = require("express");
const database = require("./src/services/DatabaseService");
const cors = require("cors");

const router = require("./src/routes/router");

const app = express();

const config = require("./config");

const { port } = config;

app.use(cors());

app.use(express.json());

app.use(router);

const startHTTP = async () => {
  return new Promise((resolve, reject) => {
    try {
      app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
};

const bootstrap = async () => {
  try {
    await database.connect();

    await startHTTP();
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
