import { Router } from "express";
import ParametroController from "../controllers/ParametroController";

const routes = Router();

routes.get('/buscar-parametro', ParametroController.buscarParametros)
routes.get('/buscar-parametro/:id', ParametroController.buscarParametrosPorId)
routes.post('/cadastrar-parametro', ParametroController.CadastrarParametros)
routes.delete('/excluir-parametro/:id', ParametroController.ExcluirParametros)

export default routes;
