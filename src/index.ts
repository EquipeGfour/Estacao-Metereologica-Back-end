import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

db.initialize().then(async(connection)=> {
    await connection.synchronize()
    console.log("Banco de Dados conectado...");
}). catch ((error)=>{
    console.error('Banco de dados não conectado, erro:', error);
})

const PORT = process.env.PORT || 3000;

app.use(routes);
app.use(cors())

app.listen(PORT, () => console.log(`Rodando na Porta ${PORT}`));
