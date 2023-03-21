import db from "../config/db";
import { Request, Response } from 'express';
import Parametros from "../models/Parametros";

class ParametrosController{
    public async buscarParametros(req: Request, res: Response){
        try{
            const parametros = await db.getRepository(Parametros).find()
            res.json(parametros);
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async buscarParametrosPorId(req: Request, res: Response){
        try{
            const parametro = await db.getRepository(Parametros).findOneBy({id: Number(req.params.id)})
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async CadastrarParametros(req: Request, res: Response){
        try{
            const {tipo, unidade_medida, fator_conversao, offset} = req.body
            const parametro = await db.getRepository(Parametros).create({tipo, unidade_medida, fator_conversao, offset});
            await db.getRepository(Parametros).save(parametro);
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async ExcluirParametros(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };
}

export default new ParametrosController();