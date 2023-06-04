import { Router } from "express";
import { MedidaController } from "../controllers";


const routes = Router();


routes.get('/buscar', MedidaController.buscarMedidas);
routes.get('/buscar/:id', MedidaController.buscarMedidasPorId);
routes.get('/buscar-estacaoMedida/:id', MedidaController.buscarMedidasEstacao);
routes.get('/buscar-ultimos-registros/:id', MedidaController.buscarUltimasMedidasRegistradas);

export default routes;