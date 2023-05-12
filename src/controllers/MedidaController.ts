import db from "../config/db";
import { Request, Response } from "express";
import Medida from "../models/Medida";
import { Estacao } from "../models";


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

    public async buscarMedidasEstacao (req: Request, res: Response){
        try{
            const {id} = req.params;
            const estacao = await db.getRepository(Estacao).findOneBy({id:Number(id)})
            if(!estacao){
                throw "Estação não encontrada..."
            }
            const dados = await db.getRepository(Medida).find({
                where:{
                    estacao:estacao
                },
                relations:{
                    estacao:true,
                    parametro:true
                }
            })

            const result = dados.reduce((acc, cur) => {
                if (acc[cur['parametro']['tipo']]) {
                    acc[cur['parametro']['tipo']].push(cur)
                } else {
                    acc[cur['parametro']['tipo']] = [cur]
                }
                return acc
            }, {})

            return res.json(result);
        }catch(error){
            res.status(500).json({message: error}); 
        }
    }

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