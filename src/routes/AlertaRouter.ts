import { Router } from "express";
import AlertaController from "../controllers/AlertaController";


const routes = Router();

routes.get('/buscar', AlertaController.buscarAlertas);


export default routes;