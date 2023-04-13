import { Request, Response } from 'express';
import db from '../config/db';
import Alerta from '../models/Alerta';
import Estacao from '../models/Estacao';
import Parametros from '../models/Parametros';
import EstacaoHasParametros from '../models/EstacaoHasParametros';


class AlertaController{
    public async buscarAlertas(req:Request, res:Response){
        try{
            const alertas = await db.getRepository(Alerta).find({
                relations: {
                    id_estacao:true,
                    id_estacao_has_parametros:true,
                    id_parametro:true
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
                    id_estacao:true,
                    id_estacao_has_parametros:true,
                    id_parametro:true
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
            const ehp = await db.getRepository(EstacaoHasParametros).find({
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

            console.log(ehp)

            const alerta = new Alerta();
            await db.transaction(async(transactionalEntityManager) => {
                alerta.nome = nome;
                alerta.mensagem = mensagem;
                alerta.condicao = condicao;
                alerta.id_estacao = ehp[0].estacao;
                alerta.id_parametro = ehp[0].parametro;
                alerta.id_estacao_has_parametros = id_estacao_has_parametros
                await transactionalEntityManager.save(alerta);
            })
            res.json(alerta);

        
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new AlertaController();