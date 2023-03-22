import db from "../config/db";
import { Request, Response } from 'express';
import Parametros from "../models/Parametros";

class ParametrosController{
    public async buscarParametros(req: Request, res: Response){
        try{
            const parametros = await db.getRepository(Parametros).find()
            res.json(parametros);
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async buscarParametrosPorId(req: Request, res: Response){
        try{
            const parametro = await db.getRepository(Parametros).findOneBy({id: Number(req.params.id)})
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async CadastrarParametros(req: Request, res: Response){
        try{
            const {tipo, unidade_medida, fator_conversao, offset} = req.body
            const parametro = await db.getRepository(Parametros).create({tipo, unidade_medida, fator_conversao, offset});
            await db.getRepository(Parametros).save(parametro);
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async ExcluirParametros(req: Request, res: Response){
        try{
            const parametro = await db.getRepository(Parametros).findOneBy({id:Number(req.params.id)})
            if(parametro){
                await db.getRepository(Parametros).delete(parametro)
                res.json(`Parâmetro de id ${parametro.id} excluida com sucesso !`)
            }else{
                res.json(`Parâmetro de ${req.params.id} não encontrada !`)
            }
        }catch(error){
            console.log(error);            
            res.status(500).json({ message: error });
        }
    };

    public async atualizarParametros(req:Request, res:Response){
        try {
            const {tipo, unidade_medida, fator_conversao, offset} = req.body
            const parametros = await db.getRepository(Parametros).findOneBy({id:Number(req.params.id)})
            if(parametros){
                if (tipo !== '') {
                    parametros.tipo = tipo;
                }
                if (unidade_medida !== '') {
                    parametros.unidade_medida = unidade_medida;
                }
                if (fator_conversao !== '') {
                    parametros.fator_conversao = fator_conversao;
                }
                if (offset !== '') {
                    parametros.offset = offset;
                }
                const parametroEditado = await db.manager.save(Parametros, parametros)
                res.json({message: 'Parametro Editado com sucesso'})
            }else{
                res.json('Parametro não encontrado')
            }
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }
}

export default new ParametrosController();