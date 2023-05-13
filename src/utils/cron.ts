import cron from 'node-cron';
import { buscarMedidas } from '../services/MedidaService';
import db from '../config/db';
import EstacaoHasParametros from '../models/EstacaoHasParametros';
import Medida from '../models/Medida';
import { medidaCollection } from '../config/mongodb';
import * as dotenv from "dotenv";
import { Estacao, Parametro, RegistroAlerta } from '../models';



dotenv.config();
const URI = process.env.URI || null;


const cronScheduleToMysql = () =>{
    if(URI){
        cron.schedule("*/15 * * * *", tratarDados);
    }else{
        cron.schedule("*/15 * * * *", ()=>console.log('Não foi possivel buscar dados do Mongodb...'));
    }
}

const cronScheduleReportAlerta = () =>{
    try {
        cron.schedule("*/5 * * * *" , verificarAlerta);
    } catch (error) {
        console.log(error);
        
    }
}

const cronScheculeSendMedidasDeTestes = () =>{
    try {
        cron.schedule("*/2 * * * *" , enviarDados);
    } catch (error) {
        console.log(error);
    }
}

const realizarReport = async (medida:Medida) =>{
    const report = new RegistroAlerta();
    report.alerta = medida.alerta;
    report.estacao = medida.estacao;
    report.estacao_has_parametros = medida.estacao_has_parametros;
    report.medida = medida;
    report.parametro = medida.parametro;
    report.latitude = medida.estacao.latitude;
    report.longitude = medida.estacao.longitude;
    report.unixtime = medida.unixtime;
    await db.getRepository(RegistroAlerta).save(report);
}

const registrarMedida = async (ligacao: EstacaoHasParametros, dados) => {
    const medida = new Medida();
    medida.valor_medido = dados.temp || dados.umi || dados.pluv || dados.bat;
    medida.estacao = ligacao.estacao ;
    medida.estacao_has_parametros = ligacao;
    medida.parametro = ligacao.parametro;
    medida.alerta = ligacao.alerta;
    medida.unixtime = new Date(dados.unx * 1000);
    await db.getRepository(Medida).save(medida);
    await medidaCollection.deleteOne({'_id': dados['_id']});
}

const enviarDados = async () => {
    const dados = [
        {
            "uid":"083AF28F2BE0",
            "temp": parseFloat(Math.random() * (100 - 1) + 1 + "").toFixed(1),
            "unx": "1683802641"
        },
        {
            "uid":"083AF28F2BE0",
            "umi": parseFloat(Math.random() * (100 - 1) + 1 + "").toFixed(1),
            "unx": "1683802641"
        },
        {
            "uid":"083AF28F2BE0",
            "pluv": parseFloat(Math.random() * (100 - 1) + 1 + "").toFixed(1),
            "unx": "1683802641"
        },
        {
            "uid":"083AF28F2BE0",
            "bat": parseFloat(Math.random() * (100 - 1) + 1 + "").toFixed(1),
            "unx": "1683802641"
        }
    ]
    console.log("Enviado  medidas de teste - ", new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
    
    await medidaCollection.insertMany(dados);
}

const buscarEstacaoHasParametros = async (dado, tipoParametro: string) => {
    const estacao = await db.getRepository(Estacao).findOneBy({uid:dado.uid});
    if(estacao){
        const parametro = await db.getRepository(Parametro).findOneBy({tipo:tipoParametro});
        const estacaoHasParametros = await db.getRepository(EstacaoHasParametros).findOne({
            relations:{
                alerta:true,
                estacao:true,
                parametro:true
            },
            where:{
                estacao:estacao,
                parametro:parametro
            }
        })
        return estacaoHasParametros;
    }
}

const tratarDados = async () =>{
    console.log('\nVerificando se existem medidas -', new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
    const medidas = await buscarMedidas();
    if(medidas.length > 0){

        const temp = medidas.filter((medida)=> medida.temp);
        const umi = medidas.filter((medida)=> medida.umi);
        const pluv = medidas.filter((medida)=> medida.pluv);
        const bateria = medidas.filter((medida)=> medida.bat);

        temp.map(async el => {
            const estacaoHasParametros = await buscarEstacaoHasParametros(el, 'Temperatura');
            if (estacaoHasParametros){
                await registrarMedida(estacaoHasParametros, el);
            }
        });   

        umi.map(async el => {
            const estacaoHasParametros = await buscarEstacaoHasParametros(el, 'Umidade');
            if (estacaoHasParametros){
                await registrarMedida(estacaoHasParametros, el);
            }  
        });

        pluv.map(async el => {
            const estacaoHasParametros = await buscarEstacaoHasParametros(el, 'Pluviometro');
            if (estacaoHasParametros){
                await registrarMedida(estacaoHasParametros, el);
            } 
        });  

        bateria.map(async el => {
            const estacaoHasParametros = await buscarEstacaoHasParametros(el, 'Bateria');
            if (estacaoHasParametros){
                await registrarMedida(estacaoHasParametros, el);
            }
        });

        console.log("\nMedidas exportadas do MongoDB para MySQL com sucesso! -", new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
        if(medidas.length > 1){
            console.log(`${medidas.length} dados exportados`);
        }else{
            console.log(`${medidas.length} dado exportado`);
        }
    }else{
        console.log("Não existem dados a serem exportados! -", new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
    }
};

const verificarAlerta = async () => {
    const medidas = await db.getRepository(Medida).find({
        relations:{
            alerta:true,
            estacao:true,
            estacao_has_parametros:true,
            parametro:true
        },
        where:{
            verificado:false
        }
    })
    medidas.forEach(async medida => {
        if(medida.alerta){
            if(medida.verificado == false){
                medida.verificado = true;
                await db.getRepository(Medida).save(medida);
            }
            if(medida.alerta.tipo == 'abaixo'){
                if(medida.valor_medido < medida.alerta.valor){
                    realizarReport(medida);
                }else{
                    console.log("Não ativou");
                }
            }
            if(medida.alerta.tipo == 'acima'){
                if(medida.valor_medido > medida.alerta.valor){
                    realizarReport(medida);
                }else{
                    console.log("Não ativou");
                }   
            }
        }else{
            console.log("Não possui alerta");
        }
    })
};


export { cronScheduleToMysql, cronScheduleReportAlerta, cronScheculeSendMedidasDeTestes };