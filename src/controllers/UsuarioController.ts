import db from "../config/db";
import { Request, Response } from 'express'
import Usuario from "../models/Usuario";

class UsuarioController{
    public async buscarUsuarios (req: Request, res: Response) {
        try{
            const usuarios = await db.getRepository(Usuario).find();
            res.json(usuarios)
        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async buscarUsuariosPorId (req: Request, res: Response) {
        try{
            const usuario = await db.getRepository(Usuario).findOneBy({id: Number(req.params.id)})
            res.json(usuario)
        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async cadastrarUsuario(req: Request, res: Response) {
        try{
            const {nome, email, senha, tipo_usuario} = req.body
            const usuario = await db.getRepository(Usuario).create({nome, email, senha, tipo_usuario});
            await db.getRepository(Usuario).save(usuario);
            res.json(usuario)

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async editarUsuario(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async excluirUsuario(req: Request, res: Response) {
        try{
            const usuario = await db.getRepository(Usuario).findOneBy({id: Number(req.params.id)});
            if(usuario){
                await db.getRepository(Usuario).delete(usuario)
                res.json(`Usuário de id ${usuario.id} excluida com sucesso...`)
            }else{
                res.json(`Usuário de id ${req.params.id} não encontrada...`)
            }
        }catch(error){
            res.status(500).json({ message: error });            
        }
    };
}

export default new UsuarioController();