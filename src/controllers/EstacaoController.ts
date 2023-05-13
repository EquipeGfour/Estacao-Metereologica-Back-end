import db from "../config/db";
import { Request, Response } from 'express';
import { Estacao } from "../models";
import { Like } from "typeorm";


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

    public async buscarPorNomeEuid(req: Request, res: Response){
        try{
            const { busca } = req.params;
            const estacao = await db.getRepository(Estacao).find({
                where:[
                    {
                        nome: Like(`%${busca}%`)
                    },
                    {
                        uid: Like(`%${busca}%`)
                    }
                ]
            })
            res.json(estacao);
        }catch(error){
            res.status(500).json({ message: error});
        }
    }

    public async cadastrarEstacao(req: Request, res: Response){
        try{
            const { uid, nome, latitude, longitude, utc } = req.body
            
            const estacao = await db.getRepository(Estacao).create({ uid, nome, latitude, longitude, utc });
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
                res.status(500).json(`Estação não encontrada.`)
            }           
        }catch(error) {
            res.status(500).json({ message: error});
            console.log(error);
            
        }
    };

    public async excluirEstacao(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const estacao = await db.getRepository(Estacao).findOneBy({id: id})
            if(estacao){
                await db.createQueryBuilder().delete().from(Estacao).where("id=:id", {id}).execute();
                res.status(200).json(`Estação de id ${estacao.id} excluida com sucesso...`)
            }else{
                res.status(404).json(`Estação de id ${req.params.id} não encontrada...`)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    };


    public async excluirEstacaoPorNome(req:Request, res: Response){
        try{
        const nome = String (req.params.nome);
        const estacao = await db.getRepository(Estacao).findOneBy({nome:nome})
        if(estacao){
            await db.createQueryBuilder().delete().from(Estacao).where("nome=:nome", {nome}).execute();
                res.status(200).json(`Estação de id ${estacao.nome} excluida com sucesso...`)
            }else{
                res.status(404).json(`Estação de id ${req.params.nome} não encontrada...`)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    };

    public async desativarEstacao(req: Request, res: Response){
        try{
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)})
            if(estacao){
                if(estacao.status == 'ativo'){
                    estacao.status = 'desativado'
                }
                const estacaoDesativada = await db.manager.save(Estacao, estacao)
                res.json({message: 'Estação desativada com sucesso!', estacaoDesativada})
            }else{
                res.json(`Estação não encontrada`)
            }
        }catch(error){
            res.status(500).json({ message: error })
        }
    }
}

export default new EstacaoController();