import { Router } from "express";
import { EstacaoHasParametrosController } from "../controllers";


const routes = Router();

routes.get('/parametroEstacao', EstacaoHasParametrosController.buscarEHP);
routes.get('/parametroEstacao/:id', EstacaoHasParametrosController.buscarEHPID);
routes.get('/parametrosEstacao/:id', EstacaoHasParametrosController.buscarParametrosDaEstacao);
routes.get('/estacoesParametro/:id', EstacaoHasParametrosController.buscarEstacoesDeUmParametro);
routes.post('/cadastrar', EstacaoHasParametrosController.cadastrarEhp);
routes.delete('/excluir/:id', EstacaoHasParametrosController.excluirEHP)

export default routes;
