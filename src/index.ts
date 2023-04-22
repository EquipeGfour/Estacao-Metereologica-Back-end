import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db";
import routes from "./routes";
import cors from "cors";
import { connectMongoDb } from "./config/mongodb";
import { cronScheduleToMysql } from "./cron";

dotenv.config();

const app = express();
app.use(express.json());

db.initialize().then(async(connection)=> {
    await connection.synchronize()
    console.log("Banco de Dados conectado...");
}). catch ((error)=>{
    console.error('Banco de dados não conectado, erro:', error);
})

connectMongoDb();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(routes);

cronScheduleToMysql();
app.listen(PORT, () => console.log(`Rodando na Porta ${PORT}`));
