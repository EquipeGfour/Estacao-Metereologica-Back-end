import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Estacao, Parametro, EstacaoHasParametros, Alerta, Usuario, Medida, RegistroAlerta } from "../models";


dotenv.config();

const PASSWORD = process.env.PASSWORD || "";
const DATABASE = process.env.DATABASE || "";
const HOST = process.env.HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;

const db = new DataSource({
    database: DATABASE,
    type: "mysql",
    host: HOST,
    port: 3306,
    username: 'root',
    password:PASSWORD,
    synchronize: true, 
    logging: false,
    entities: [Estacao, Parametro, EstacaoHasParametros, Alerta, Usuario, Medida, RegistroAlerta],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    maxQueryExecutionTime: 2000
});

export default db;