import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routes = Router();

routes.get('/estacao', EstacaoController.buscarEstacoes);

export default routes;