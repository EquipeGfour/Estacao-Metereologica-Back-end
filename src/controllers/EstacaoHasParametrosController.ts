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
            const ehp = await db.getRepository(EstacaoHasParametrosController).find();
            res.json(ehp)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error})
        }
    }

    public async buscarEHPID (req: Request, res: Response){
        try {
            const ehp = await db.getRepository(EstacaoHasParametros).findOneBy({id: (req.params.id)})
        } catch (error) {
            
        }
    }
}

export default new EstacaoHasParametrosController();