import { Router } from "express";
import { UsuarioController } from "../controllers";


const routes = Router();

routes.get('/buscar', UsuarioController.buscarUsuarios);
routes.get('/buscar/:id', UsuarioController.buscarUsuariosPorId);
routes.post('/cadastrar', UsuarioController.cadastrarUsuario);
routes.put('/editar/:id', UsuarioController.editarUsuario);
routes.delete('/excluir/:id', UsuarioController.excluirUsuario);

export default routes