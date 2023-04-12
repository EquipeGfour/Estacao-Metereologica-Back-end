import { Request, Response } from 'express';
import db from '../config/db';
import Alerta from '../models/Alerta';


class AlertaController{
    public async buscarAlertas(req:Request, res:Response){
        try{
            const alertas = await db.getRepository(Alerta).find({
                relations: {
                    id_estacao:true,
                    id_estacao_has_parametros:true,
                    id_parametro:true
                }
            });
            res.json(alertas);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
}

export default new AlertaController();