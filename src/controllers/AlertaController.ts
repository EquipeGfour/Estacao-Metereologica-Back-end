import { Request, Response } from 'express';
import db from '../config/db';
import Alerta from '../models/Alerta';
import Estacao from '../models/Estacao';
import Parametros from '../models/Parametro';
import EstacaoHasParametros from '../models/EstacaoHasParametros';


class AlertaController{
    public async buscarAlertas(req:Request, res:Response){
        try{
            const alertas = await db.getRepository(Alerta).find({
                relations: {
                    estacao:true,
                    id_estacao_has_parametros:true,
                    parametro:true
                }
            });
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
                },
                relations:{
                    estacao:true,
                    id_estacao_has_parametros:true,
                    parametro:true
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

    public async cadastrarAlerta(req:Request, res:Response){
        try{
            const {nome, mensagem, condicao, id_estacao_has_parametros} = req.body
            const ehp = await db.getRepository(EstacaoHasParametros).findOne({
                where:{
                    id:id_estacao_has_parametros
                },
                relations:{
                    estacao:true,
                    parametro:true
                }
            })
            if(!ehp){
                res.status(404).json("Ligação não econtrada...");
            }

            

            const alerta = new Alerta();
            await db.transaction(async(transactionalEntityManager) => {
                alerta.nome = nome;
                alerta.mensagem = mensagem;
                alerta.condicao = condicao;
                alerta.estacao = ehp.estacao;
                alerta.parametro = ehp.parametro;
                alerta.id_estacao_has_parametros = id_estacao_has_parametros
                await transactionalEntityManager.save(alerta);
            })
            res.json(alerta);

        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async editarAlerta(req:Request, res:Response){
        try{
            const {nome, mensagem, condicao} = req.body;
            const id = Number(req.params.id)
            const alerta = await db.getRepository(Alerta).findOne({
                where:{
                    id: id
                },
                relations:{
                    estacao:true,
                    id_estacao_has_parametros:true,
                    parametro:true
                }
            });
            if(!alerta){
                res.status(404).json(`Alerta não encontrado...`);
            }else{
                if(nome){
                    alerta.nome = nome
                }
                if(mensagem){
                    alerta.mensagem = mensagem
                }
                if(condicao){
                    alerta.condicao = condicao
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