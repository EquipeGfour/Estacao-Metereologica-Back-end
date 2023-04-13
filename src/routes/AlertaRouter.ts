import { Router } from "express";
import AlertaController from "../controllers/AlertaController";


const routes = Router();

routes.get('/buscar', AlertaController.buscarAlertas);
routes.get('/buscar/:id', AlertaController.buscarAlerta);
routes.post('/cadastrar', AlertaController.cadastrarAlerta);


export default routes;