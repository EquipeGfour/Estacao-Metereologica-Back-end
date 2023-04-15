import { Router } from "express";
import Estacao from "./EstacaoRouter"
import Parametro from "./ParametroRouter";
import EHP from "./EhpRouter";
import Alerta from "./AlertaRouter";
import Usuario from "./UsuarioRouter";
import RegistroAlerta from "./RegistroAlertaRouter";


const routes = Router();

routes.use('/estacao', Estacao);
routes.use('/parametro', Parametro);
routes.use('/ehp', EHP);
routes.use('/alerta', Alerta);
routes.use('/usuarios', Usuario);
routes.use('/registro-alerta', RegistroAlerta)

export default routes;