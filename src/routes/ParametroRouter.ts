import { Router } from "express";
import ParametroController from "../controllers/ParametroController";

const routes = Router();

routes.get('/buscar-parametro', ParametroController.buscarParametros)
routes.get('/buscar-parametro/:id', ParametroController.buscarParametrosPorId)
routes.get('/busca/:busca', ParametroController.buscarParametroPorTipoDescricao)
routes.post('/cadastrar-parametro', ParametroController.CadastrarParametros)
routes.delete('/excluir-parametro/:id', ParametroController.ExcluirParametros)
routes.put('/atualizar-parametro/:id', ParametroController.atualizarParametros)

export default routes;
