import { Router } from "express";
import Estacao from "./EstacaoRouter"
import Parametros from "./ParametrosRouter";
import EHP from "./EhpRouter"

const routes = Router();

routes.use('/estacao', Estacao);
routes.use('/parametro', Parametros);
routes.use('/ehp', EHP)

export default routes;