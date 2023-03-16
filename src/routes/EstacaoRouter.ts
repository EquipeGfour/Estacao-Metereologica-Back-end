import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routes = Router();

routes.get('/buscar', EstacaoController.buscarEstacoes);

routes.post('/cadastrar', EstacaoController.cadastrarEstacao);
routes.delete('/excluir/:id', EstacaoController.excluirEstacao);

export default routes;