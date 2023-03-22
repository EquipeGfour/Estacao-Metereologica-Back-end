import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routes = Router();

routes.get('/buscar', EstacaoController.buscarEstacoes);
routes.get('/buscar/:id', EstacaoController.buscarEstacaoPorId);
routes.post('/cadastrar', EstacaoController.cadastrarEstacao);
routes.put('/editar/:id', EstacaoController.editarEstacao);
routes.delete('/excluir/:id', EstacaoController.excluirEstacao);

export default routes;