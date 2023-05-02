import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db";
import routes from "./routes";
import cors from "cors";
import { connectMongoDb } from "./config/mongodb";
import { cronScheduleToMysql } from "./cron";

dotenv.config();


const PORT = process.env.PORT || 5000;
const URI = process.env.URI || null;

const app = express();
app.use(express.json());

db.initialize().then(async(connection)=> {
    await connection.synchronize()
    console.log("Conexão estabelecida com o MySql...");
}). catch ((error)=>{
    console.error('Não foi possivel se conectar ao MySql, erro:', error);
})


if(URI){
    connectMongoDb();
}else{
    console.log('Não foi possivel se conectar ao Mongodb, Uri necessaria...');
}


app.use(cors());
app.use(routes);

cronScheduleToMysql();
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}...`));
