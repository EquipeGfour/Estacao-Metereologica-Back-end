import { Router } from "express";
import Estacao from "./EstacaoRouter"
import Parametros from "./ParametrosRouter";
import EHP from "./EhpRouter";
import Alerta from "./AlertaRouter";


const routes = Router();

routes.use('/estacao', Estacao);
routes.use('/parametro', Parametros);
routes.use('/ehp', EHP);
routes.use('/alerta', Alerta);

export default routes;