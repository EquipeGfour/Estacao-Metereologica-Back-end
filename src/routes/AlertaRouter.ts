import { Router } from "express";
import { AlertaController } from "../controllers";


const routes = Router();

routes.get('/buscar', AlertaController.buscarAlertas);
routes.get('/buscar/:id', AlertaController.buscarAlerta);
routes.get('/busca/:busca', AlertaController.buscarAlertaPorNomeMsg);
routes.post('/cadastrar', AlertaController.cadastrarAlerta);
routes.put('/vincular', AlertaController.vincularAlerta);
routes.put('/editar/:id', AlertaController.editarAlerta);
routes.delete('/excluir/:id', AlertaController.excluirAlerta);

export default routes;