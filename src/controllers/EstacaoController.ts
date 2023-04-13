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
        try{
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
            if (estacao) {
                res.status(201).json(estacao)
            }else{
                res.status(404).json(`Estação não encontrada.`);
            } 
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error});
        }
    };

    public async cadastrarEstacao(req: Request, res: Response){
        try{
            const { nome, latitude, longitude, utc } = req.body
            
            const estacao = await db.getRepository(Estacao).create({ nome, latitude, longitude, utc });
            await db.getRepository(Estacao).save(estacao);

            res.json(estacao);
        }catch(error){
            res.status(500).json({ message: error });
        }
    };

    public async editarEstacao (req: Request, res: Response) {
        try{
            const { nome, data_criacao, latitude, longitude, utc } = req.body
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
            if (estacao) {
                if (nome !== '') {
                    estacao.nome = nome;
                }
                if (data_criacao !== '') {
                    estacao.data_criacao = data_criacao;
                }
                if (latitude !== '') {
                    estacao.latitude = latitude;
                }
                if (longitude !== '') {
                    estacao.longitude = longitude;
                }
                if (utc !== '') {
                    estacao.utc = utc;
                }
                const estacaoEditada = await db.manager.save(Estacao, estacao)
                res.json({message: 'Estação editada com sucesso!', estacaoEditada})
            }else{
                res.json(`Estação não encontrada.`)
            }           
        }catch(error) {
            res.status(500).json({ message: error});
            console.log(error);
            
        }
    };

    public async excluirEstacao(req: Request, res: Response){
        try{
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
            if(estacao){
                await db.getRepository(Estacao).delete(estacao)
                res.status(200).json(`Estação de id ${estacao.id} excluida com sucesso...`)
            }else{
                res.status(404).json(`Estação de id ${req.params.id} não encontrada...`)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    };
}

export default new EstacaoController();