import db from "../config/db";
import { Request, Response } from 'express';
import EstacaoHasParametros from "../models/EstacaoHasParametros";

class EstacaoHasParametrosController{
    public async cadatrarEhp(req:Request , res: Response){
        try {
            const {id} = req.body
            const ehp = await db.getRepository(EstacaoHasParametros).create({id})
            await db.getRepository(EstacaoHasParametros).save(ehp);
        } catch (error) {
            
        }
    }


    public async buscarEHP (req:Request, res: Response){
        try {
            const estacoes = await db.getRepository(EstacaoHasParametros).find({
                relations:{
                    estacao:true,
                    parametro: true
                }
            });
            res.json(estacoes)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error})
        }
    }

    public async buscarEHPID (req: Request, res: Response){
        try {
            const dados = await db.getRepository(EstacaoHasParametros).findOne({relations:{
                estacao:true,
                parametro: true
            },
            where:{id:Number(req.params.id)}
        })
            if (dados) {
                res.json(dados)
            }else{
                res.json(`Não encontrado.`)
            } 
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}

export default new EstacaoHasParametrosController();