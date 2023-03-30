import { Router } from "express";
import EstacaoHasParametrosController from "../controllers/EstacaoHasParametrosController"

const routes = Router();

routes.get('/parametro-estacao', EstacaoHasParametrosController.buscarEHP);
routes.get('/parametro-estacao/:id', EstacaoHasParametrosController.buscarEHPID);
routes.post('/cadastrar', EstacaoHasParametrosController.cadatrarEhp);

export default routes;
