const express = require("express");
const database = require("./src/services/DatabaseService");
const cors = require("cors");

const router = require("./src/routes/router");

const app = express();

const config = require("./config");

const { port } = config;

const allowedOrigins = ['http://45.12.239.119:3000', 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Разрешить отправку учетных данных
};

app.use(cors(corsOptions));

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
