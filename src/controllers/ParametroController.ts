import db from "../config/db";
import { Request, Response } from 'express';
import Parametros from "../models/Parametros";

class ParametrosController{
    public async buscarParametros(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async buscarParametrosPorId(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async CadastrarParametros(req: Request, res: Response){
        try{

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