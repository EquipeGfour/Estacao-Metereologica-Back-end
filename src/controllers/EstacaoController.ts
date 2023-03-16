import db from "../config/db";
import { Request, Response } from 'express';
import Estacao from "../models/Estacao";


class EstacaoController {
    public async buscarEstacoes (req: Request, res: Response) {
        try{
            const estacoes = await db.getRepository(Estacao).find();
            res.json(estacoes);
        }catch(error){
            console.log(error);
            
            res.status(500).json({ message: error });
        }
    };

    public async buscarEstacaoPorId (req: Request, res: Response) {
        const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
    };

    public async cadastrarEstacao(req: Request, res: Response){
        try{
            const { nome, data_criacao, latitude, longitude, utc } = req.body
            const estacao = await db.getRepository(Estacao).create({ nome, data_criacao, latitude, longitude, utc });
            await db.getRepository(Estacao).save(estacao);

            res.json(estacao);
        }catch(error){
            res.status(500).json({ message: error });
        }
    };

    public async excluirEstacao(req: Request, res: Response){
        try{
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
            if(estacao){
                await db.getRepository(Estacao).delete(estacao)
                res.json(`Estação de id ${estacao.id} excluida com sucesso...`)
            }else{
                res.json(`Estação de id ${req.params.id} não encontrada...`)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    };
}

export default new EstacaoController();