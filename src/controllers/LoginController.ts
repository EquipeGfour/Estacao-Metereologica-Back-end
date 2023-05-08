import db from "../config/db";
import { Request, Response } from 'express';
import { Usuario } from "../models";


class LoginController{
    public async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const usuario = await db.getRepository(Usuario).findOneBy({email:email, senha:senha});
            if(!usuario){
                throw 'Email ou senha incorreta'
            }
            res.json(usuario);
        }catch(error){
            res.status(500).json(error)
        }
    }
}


export default new LoginController();