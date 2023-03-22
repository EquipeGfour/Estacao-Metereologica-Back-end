import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import Estacao from "../models/Estacao";
import Parametros from "../models/Parametros";
import EstacaoHasParametros from "../models/EstacaoHasParametros";

dotenv.config();

const USER = process.env.USER || "root";
const PASSWORD = process.env.PASSWORD || "";
const DATABASE = process.env.DATABASE || "";
const HOST = process.env.HOST || "localhost";


const db = new DataSource({
    database: DATABASE,
    type: "mysql",
    host: HOST,
    port: 3306,
    username: USER,
    password:PASSWORD,
    synchronize: true, 
    logging: false,
    entities: [Estacao, Parametros, EstacaoHasParametros],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    maxQueryExecutionTime: 2000
});

export default db;