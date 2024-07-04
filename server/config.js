const dotenv = require("dotenv")

dotenv.config()

const config = {

    port: parseInt(process.env.HTTP_PORT || "8080", 10),

    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER
    },

    jwtSecret: process.env.JWT_SECRET

}

module.exports = config;