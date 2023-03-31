import db from "../config/db";
import { Request, Response } from 'express';
import EstacaoHasParametros from "../models/EstacaoHasParametros";
import Estacao from "../models/Estacao";
import Parametros from "../models/Parametros";


class EstacaoHasParametrosController{
    public async cadatrarEhp(req:Request , res: Response){
        try {
            const { id_estacao, id_parametro } = req.body;
            const estacao = await db.getRepository(Estacao).findOne({ where: { id: Number(id_estacao) } })
            const parametro = await db.getRepository(Parametros).findOne({ where: { id: Number(id_parametro) } })

            if (!estacao) {
                return res.status(404).json({ message: 'Estação não encontrada.' });
            }
            if (!parametro) {
                return res.status(404).json({ message: 'Parâmetro não encontrado !' });
            }

            const ehp = new EstacaoHasParametros();
            ehp.estacao = estacao;
            ehp.parametro = parametro;
            const dado = await db.getRepository(EstacaoHasParametros).save(ehp);
        
            return res.status(201).json(dado);
        } catch (error) {
            res.status(500).json({message: error});
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
            res.status(200).json(estacoes);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
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
                res.status(200).json(dados);
            }else{
                res.status(404).json(`Não encontrado.`);
            } 
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    public async buscarParametrosDaEstacao(req: Request, res: Response){
        try{
            const id_estacao = req.params.id
            const dados = await db.getRepository(EstacaoHasParametros).find({
                where:{
                    estacao:{
                        id: Number(id_estacao)
                    }
                },
                relations:{
                    estacao:true,
                    parametro:true
                }
            });

            res.status(200).json(dados);
        }catch(error){
            res.status(500).json({message: error});
        }
    }

    public async buscarEstacoesDeUmParametro(req: Request, res: Response){
        try{
            const id_parametro = req.params.id
            const dados = await db.getRepository(EstacaoHasParametros).find({
                where:{
                    parametro:{
                        id: Number(id_parametro)
                    }
                },
                relations:{
                    estacao:true,
                    parametro:true
                }
            });

            res.status(200).json(dados);
        }catch(error){
            res.status(500).json({message: error});
        }
    }
}

export default new EstacaoHasParametrosController();