import db from "../config/db";
import { Request, Response } from "express";
import Medida from "../models/Medida";


class MedidaController{
    public async buscarMedidas (req:Request, res: Response){
        try{
            const medidas = await db.getRepository(Medida).find({
                relations:{
                    estacao:true,
                    parametro:true,
                    estacao_has_parametros:true
                }
            });
            res.json(medidas)
        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async buscarMedidasPorId(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const medida = await db.getRepository(Medida).findOne({
                where:{
                    id:id
                },
                relations:{
                    estacao:true,
                    parametro:true,
                    estacao_has_parametros:true
                }
            });
            if(medida){
                res.json(medida)
            }else{
                res.status(404).json("Medida não encontrada...")
            }
        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async cadastrarMedidas(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async editarMedidas(req:Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async excluirMedidas(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    }
}

export default new MedidaController()