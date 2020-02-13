require("dotenv").config(); // this is important!

let config = {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false
};

module.exports = {
    development: config,
    test: config,
    production: config
};
