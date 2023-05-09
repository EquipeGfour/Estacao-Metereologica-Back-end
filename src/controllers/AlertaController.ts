import { Request, Response } from 'express';
import db from '../config/db';
import Alerta from '../models/Alerta';
import Estacao from '../models/Estacao';
import Parametro from '../models/Parametro';
import EstacaoHasParametros from '../models/EstacaoHasParametros';
import { Like } from 'typeorm';


class AlertaController{
    public async buscarAlertas(req:Request, res:Response){
        try{
            const alertas = await db.getRepository(Alerta).find();
            res.json(alertas);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarAlerta(req:Request, res:Response){
        try{
            const id = Number(req.params.id)
            const alerta = await db.getRepository(Alerta).find({
                where:{
                    id: id
                }
            });
            if(!alerta){
                res.status(404).json(`Alerta não encontrado...`);
            }else{
                res.status(201).json(alerta)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarAlertaPorNomeMsg(req:Request, res:Response){
        try{
            const { busca } = req.params;
            const alertas = await db.getRepository(Alerta).find({
                where:[
                    {
                        nome: Like(`%${busca}%`)
                    },
                    {
                        mensagem: Like(`%${busca}%`)
                    }
                ]
            });
            res.json(alertas);
        }catch(error){
            res.status(500).json({ message:error });
        }
    }

    public async cadastrarAlerta(req:Request, res:Response){
        try{
            const {nome, mensagem, tipo, valor} = req.body

            const alerta = new Alerta();
            await db.transaction(async(transactionalEntityManager) => {
                alerta.nome = nome;
                alerta.mensagem = mensagem;
                alerta.tipo = tipo;
                alerta.valor = valor;

                await transactionalEntityManager.save(alerta);
            })
            res.json(alerta);

        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async vincularAlerta(req:Request, res:Response){
        try{
            const { id_estacao, id_parametro, id_alerta } = req.body;
            const alerta = await db.getRepository(Alerta).findOne({where:{id:id_alerta}});
            const estacao_has_parametros = await db.getRepository(EstacaoHasParametros).findOne({
                where:{
                    estacao: id_estacao,
                    parametro: id_parametro
                }
            });
            estacao_has_parametros.alerta = alerta;
            await db.getRepository(EstacaoHasParametros).save(estacao_has_parametros);
            res.json(estacao_has_parametros);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async editarAlerta(req:Request, res:Response){
        try{
            const {nome, mensagem, tipo, valor} = req.body;
            const id = Number(req.params.id)
            const alerta = await db.getRepository(Alerta).findOne({
                where:{
                    id: id
                }
            });
            if(!alerta){
                res.status(404).json(`Alerta não encontrado...`);
            }else{
                if(nome){
                    alerta.nome = nome;
                }
                if(mensagem){
                    alerta.mensagem = mensagem;
                }
                if(tipo){
                    alerta.tipo = tipo
                }
                if(valor){
                    alerta.valor = valor
                }
                await db.manager.save(Alerta, alerta)
                res.status(201).json(alerta)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }

    }

    public async excluirAlerta(req:Request, res:Response){
        try{
            const id = Number(req.params.id);
            const alerta = await db.getRepository(Alerta).findOne({where:{id:id}});
            if(alerta){
                await db.createQueryBuilder().delete().from(Alerta).where("id=:id",{id}).execute();
                res.status(200).json(`Alerta de id ${alerta.id} excluida com sucesso...`);
            }else{
                res.status(404).json(`Alerta de id ${id} não encontrada...`);
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new AlertaController();