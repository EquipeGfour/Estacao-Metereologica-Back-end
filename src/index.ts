import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db"

dotenv.config();

const app = express();
app.use(express.json())

db.initialize().then(()=> {
    console.log("Banco de Dados conectado");
}). catch ((error)=>{
    console.error('Banco de dados não conectado, erro:', error)
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Servidor está rodando na ${PORT}`));
