import db from "../config/db";
import { Request, Response } from 'express';
import Estacao from "../models/Estacao";


class EstacaoController {
    public async buscarEstacoes (req:Request, res:Response) {
        const estacoes = await db
        .getRepository(Estacao)
        .find()
        return res.json(estacoes)
    }

    public async buscarEstacaoId (req:Request, res:Response) {
        const estacoesId = await db
        .getRepository(Estacao)
        .findOneBy({
            id: 1,
        })
    }
}

export default new EstacaoController();