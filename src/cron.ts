import cron from 'node-cron'
import { buscarMedidas } from './services/MedidaService';
import db from './config/db';
import EstacaoHasParametros from './models/EstacaoHasParametros';
import Medida from './models/Medida';
import { medidaCollection } from './config/mongodb';

const cronScheduleToMysql = () =>{
    cron.schedule("*/15 * * * *", tratarDados); 
}

const tratarDados = async () =>{
    const medidas = await buscarMedidas()
    const temp = medidas.filter((medida)=> medida.temp)
    const umi = medidas.filter((medida)=> medida.umi)
    const pluv = medidas.filter((medida)=> medida.pluv)
    const bateria = medidas.filter((medida)=> medida.bat)

    temp.forEach(async el => {
        const estacaoHasTemperatura = await db.getRepository(EstacaoHasParametros).createQueryBuilder("estacoes_has_parametros")
                        .innerJoinAndSelect("estacoes_has_parametros.estacao", "estacoes" )
                        .leftJoinAndSelect('estacoes_has_parametros.parametro', 'parametros')
                        .where("estacoes.uid = :uid", {uid: el.uid})
                        .andWhere('parametros.tipo = :tipo', {tipo: 'Temperatura'})
                        .getOne()
        if (estacaoHasTemperatura){
            const medida = new Medida()
            medida.valor_medido = el.temp
            medida.id_estacao = estacaoHasTemperatura.estacao 
            medida.id_estacao_has_parametros = estacaoHasTemperatura
            medida.id_parametro = estacaoHasTemperatura.parametro 
            medida.unixtime = new Date(el.unx * 1000);
            console.log(medida);
            await db.getRepository(Medida).save(medida)
            await medidaCollection.deleteOne({'_id': el['_id']})
        }   
    })     
    umi.forEach(async el => {
        const estacaoHasUmidade = await db.getRepository(EstacaoHasParametros).createQueryBuilder("estacoes_has_parametros")
                        .innerJoinAndSelect("estacoes_has_parametros.estacao", "estacoes" )
                        .leftJoinAndSelect('estacoes_has_parametros.parametro', 'parametros')
                        .where("estacoes.uid = :uid", {uid: el.uid})
                        .andWhere('parametros.tipo = :tipo', {tipo: 'Umidade'})
                        .getOne()
        if (estacaoHasUmidade){
            const medida = new Medida()
            medida.valor_medido = el.umi
            medida.id_estacao = estacaoHasUmidade.estacao 
            medida.id_estacao_has_parametros = estacaoHasUmidade
            medida.id_parametro = estacaoHasUmidade.parametro 
            medida.unixtime = new Date(el.unx * 1000);
            console.log(medida);
            await db.getRepository(Medida).save(medida)
            await medidaCollection.deleteOne({'_id': el['_id']})
        }   
    })
    pluv.forEach(async el => {
        const estacoesHasPluviometro = await db.getRepository(EstacaoHasParametros).createQueryBuilder("estacoes_has_parametros")
                        .innerJoinAndSelect("estacoes_has_parametros.estacao", "estacoes" )
                        .leftJoinAndSelect('estacoes_has_parametros.parametro', 'parametros')
                        .where("estacoes.uid = :uid", {uid: el.uid})
                        .andWhere('parametros.tipo = :tipo', {tipo: 'Pluviometro'})
                        .getOne()
        if (estacoesHasPluviometro){
            const medida = new Medida()
            medida.valor_medido = el.pluv
            medida.id_estacao = estacoesHasPluviometro.estacao 
            medida.id_estacao_has_parametros = estacoesHasPluviometro
            medida.id_parametro = estacoesHasPluviometro.parametro 
            medida.unixtime = new Date(el.unx * 1000);
            console.log(medida);
            await db.getRepository(Medida).save(medida)
            await medidaCollection.deleteOne({'_id': el['_id']})
        }     
    })    
    bateria.forEach(async el => {
        const estacoesHasBateria = await db.getRepository(EstacaoHasParametros).createQueryBuilder("estacoes_has_parametros")
                        .innerJoinAndSelect("estacoes_has_parametros.estacao", "estacoes" )
                        .leftJoinAndSelect('estacoes_has_parametros.parametro', 'parametros')
                        .where("estacoes.uid = :uid", {uid: el.uid})
                        .andWhere('parametros.tipo = :tipo', {tipo: 'Bateria'})
                        .getOne()
        if (estacoesHasBateria){
            const medida = new Medida()
            medida.valor_medido = el.bat
            medida.id_estacao = estacoesHasBateria.estacao 
            medida.id_estacao_has_parametros = estacoesHasBateria
            medida.id_parametro = estacoesHasBateria.parametro 
            medida.unixtime = new Date(el.unx * 1000);
            console.log(medida);
            await db.getRepository(Medida).save(medida)
            await medidaCollection.deleteOne({'_id': el['_id']})
        }             
    })
    console.log("Medidas exportadas do MongoDB para MySQL com sucesso ! ", new Date());             
}

export {cronScheduleToMysql}