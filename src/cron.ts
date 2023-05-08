import cron from 'node-cron';
import { buscarMedidas } from './services/MedidaService';
import db from './config/db';
import EstacaoHasParametros from './models/EstacaoHasParametros';
import Medida from './models/Medida';
import { medidaCollection } from './config/mongodb';
import * as dotenv from "dotenv";


dotenv.config();
const URI = process.env.URI || null;


const cronScheduleToMysql = () =>{
    if(URI){
        cron.schedule("*/15 * * * *", tratarDados);
    }else{
        cron.schedule("*/15 * * * *", ()=>console.log('Não foi possivel buscar dados do Mongodb...'));
    }
}

const tratarDados = async () =>{
    console.log('\nVerificando se existem medidas -', new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
    const medidas = await buscarMedidas()
    if(medidas.length > 0){

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
                medida.estacao = estacaoHasTemperatura.estacao 
                medida.estacao_has_parametros = estacaoHasTemperatura
                medida.parametro = estacaoHasTemperatura.parametro 
                medida.unixtime = new Date(el.unx * 1000);
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
                medida.estacao = estacaoHasUmidade.estacao 
                medida.estacao_has_parametros = estacaoHasUmidade
                medida.parametro = estacaoHasUmidade.parametro 
                medida.unixtime = new Date(el.unx * 1000);
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
                medida.estacao = estacoesHasPluviometro.estacao 
                medida.estacao_has_parametros = estacoesHasPluviometro
                medida.parametro = estacoesHasPluviometro.parametro 
                medida.unixtime = new Date(el.unx * 1000);
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
                medida.estacao = estacoesHasBateria.estacao 
                medida.estacao_has_parametros = estacoesHasBateria
                medida.parametro = estacoesHasBateria.parametro 
                medida.unixtime = new Date(el.unx * 1000);
                await db.getRepository(Medida).save(medida)
                await medidaCollection.deleteOne({'_id': el['_id']})
            }             
        })
        console.log("\nMedidas exportadas do MongoDB para MySQL com sucesso! -", new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
        if(medidas.length > 1){
            console.log(`${medidas.length} dados exportados`);
        }else{
            console.log(`${medidas.length} dado exportado`);
        }
    }else{
        console.log("Não existem dados a serem exportados! -", new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
    }
}

export {cronScheduleToMysql}