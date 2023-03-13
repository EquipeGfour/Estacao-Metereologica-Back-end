import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Servidor rodando na ${PORT}`));
