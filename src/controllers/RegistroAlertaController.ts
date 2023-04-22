import db from "../config/db";
import { Request, Response } from 'express';
import RegistroAlerta from '../models/RegistroAlerta';


class RegistroAlertaController{
    // public registrarAlerta(dado){

    // }
    public async buscarRegistros(req: Request, res: Response){
        try{
            const registros = await db.getRepository(RegistroAlerta).find({
                relations:{
                    alerta:true,
                    estacao:true,
                    estacao_has_parametros:true,
                    parametro:true
                }
            });
            res.status(200).json(registros);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async bubuscarRegistro(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const registro = await db.getRepository(RegistroAlerta).findOne({
                where: {
                    id:id
                },
                relations:{
                    alerta:true,
                    estacao:true,
                    estacao_has_parametros:true,
                    parametro:true
                }
            });
            if(!registro){
                res.status(404).json("Registro de alerta não encontrado....");
            }else{
                res.status(200).json(registro);
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new RegistroAlertaController();