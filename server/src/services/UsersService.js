const database = require("./DatabaseService");
const jwt = require("jsonwebtoken");

const config = require("../../config");

class UsersService {
    async getByUserLogin(userlogin) {
        return new Promise((resolve, reject) => {
            database.connection.query(
                `
                SELECT * FROM users WHERE userlogin = (?)
            `,
                [userlogin],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result.at(0));
                }
            );
        });
    }

    async login(userlogin, password) {
        const user = await this.getByUserLogin(userlogin);
        console.log(config);
        if (!user) {
            return {
                error: "User not found",
            };
        }

        if (password != user.userpassword) {
            return {
                error: "Invalid password",
            };
        }

        const token = jwt.sign(
            {
                user: {
                    login: user.userlogin,
                    id: user.id,
                },
            },
            config.jwtSecret
        );

        return {
            status: 200,
            token,
        };
    }

    getUserByToken(token) {
        try {
            const payload = jwt.verify(token, process.jwtSecret);

            if (!payload) {
                return undefined;
            }

            return payload;
        } catch (e) {
            console.log(e);

            return undefined;
        }
    }

    async register(userlogin, password) {
        return new Promise((resolve, reject) => {
            database.connection.query(
                `
                INSERT INTO user (userlogin, userpassword) values (?, ?)
            `,
                [userlogin, password],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                }
            );
        });
    }
}

module.exports = new UsersService();
