import { Router } from "express";
import MedidaController from "../controllers/MedidaController";


const routes = Router();


routes.get('/buscar', MedidaController.buscarMedidas)
routes.get('/buscar/:id', MedidaController.buscarMedidasPorId)
routes.get('/buscar-estacaoMedida/:id', MedidaController.buscarMedidasEstacao)

export default routes;