import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
        underscored: true,
        timestamps: true,
    },
});

export default sequelize;