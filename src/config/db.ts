import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";


const USER = process.env.USER || "root"
const PASSWORD = process.env.PASSWORD || ""
const DATABASE = process.env.DATABASE || ""
const HOST = process.env.HOST || "localhost"
const url = process.env.DATABASE_URL || `mysql://${USER}:${PASSWORD}@${HOST}:3306/${DATABASE}`;

const db = new Sequelize (url)

export default db