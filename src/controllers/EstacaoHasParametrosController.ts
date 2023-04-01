import db from "../config/db";
import { Request, Response } from 'express';
import EstacaoHasParametros from "../models/EstacaoHasParametros";
import Estacao from "../models/Estacao";
import Parametros from "../models/Parametros";


class EstacaoHasParametrosController {
    public async cadastrarEhp(req: Request, res: Response) {
        const { id_estacao, id_parametros } = req.body;

        try {
            const estacao = await db.getRepository(Estacao).findOne({ where: { id: id_estacao } });

            if (!estacao) {
                return res.status(404).json({ message: 'Estação não encontrada.' });
            }

            const parametros = await db.getRepository(Parametros).findByIds(id_parametros);
            if (parametros.length !== id_parametros.length) {
                return res.status(404).json({ message: 'Parâmetros não encontrados!' });
            }

            const dados = [];

            await db.transaction(async (transactionalEntityManager) => {
                for (let id_parametro of id_parametros) {
                    const parametro = parametros.find((p) => p.id === id_parametro);
                    const ehp = new EstacaoHasParametros();
                    ehp.estacao = estacao;
                    ehp.parametro = parametro;
                    const dado = await transactionalEntityManager.save(ehp);
                    dados.push(dado);
                }
            });
            return res.status(201).json({ message: 'Parâmetros cadastrados', dados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }


    public async buscarEHP(req: Request, res: Response) {
        try {
            const estacoes = await db.getRepository(EstacaoHasParametros).find({
                relations: {
                    estacao: true,
                    parametro: true
                }
            });
            res.status(200).json(estacoes);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }

    public async buscarEHPID(req: Request, res: Response) {
        try {
            const dados = await db.getRepository(EstacaoHasParametros).findOne({
                relations: {
                    estacao: true,
                    parametro: true
                },
                where: { id: Number(req.params.id) }
            })
            if (dados) {
                res.status(200).json(dados);
            } else {
                res.status(404).json(`Não encontrado.`);
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarParametrosDaEstacao(req: Request, res: Response) {
        try {
            const id_estacao = req.params.id
            const estacao = await db.getRepository(Estacao).findOneBy({id: Number(req.params.id)});
            const dados = await db.getRepository(EstacaoHasParametros).find({
                where: {
                    estacao: {
                        id: Number(id_estacao)
                    }
                },
                relations: {
                    estacao: false,
                    parametro: true
                }
            });

            res.status(200).json({ estacao, dados });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarEstacoesDeUmParametro(req: Request, res: Response) {
        try {
            const id_parametro = req.params.id
            const dados = await db.getRepository(EstacaoHasParametros).find({
                where: {
                    parametro: {
                        id: Number(id_parametro)
                    }
                },
                relations: {
                    estacao: true,
                    parametro: false
                }
            });

            res.status(200).json(dados);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new EstacaoHasParametrosController();