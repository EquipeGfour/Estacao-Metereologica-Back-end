import { Router } from "express";
import Estacao from "./EstacaoRouter"
import Parametro from "./ParametroRouter";
import EHP from "./EhpRouter";
import Alerta from "./AlertaRouter";
import Usuario from "./UsuarioRouter";
import RegistroAlerta from "./RegistroAlertaRouter";
import Medida from "./MedidaRouter";
import LoginController from "../controllers/LoginController";


const routes = Router();

routes.use('/estacao', Estacao);
routes.use('/parametro', Parametro);
routes.use('/ehp', EHP);
routes.use('/alerta', Alerta);
routes.use('/usuarios', Usuario);
routes.use('/registro-alerta', RegistroAlerta)
routes.use('/medida', Medida);
routes.use('/login', LoginController.login)

export default routes;