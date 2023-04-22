import { Router } from "express";
import RegistroAlertaController from "../controllers/RegistroAlertaController";


const routes = Router();

routes.get('/buscar', RegistroAlertaController.buscarRegistros);
routes.get('/buscar/:id', RegistroAlertaController.bubuscarRegistro);

export default routes;