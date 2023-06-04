import db from "../config/db";
import { Request, Response } from "express";
import { Medida, Estacao } from "../models";


class MedidaController {
    public async buscarMedidas(req: Request, res: Response) {
        try {
            const medidas = await db.getRepository(Medida).find({
                relations: {
                    estacao: true,
                    parametro: true,
                    estacao_has_parametros: true
                },
                order: {
                    unixtime: "DESC"
                }
            });
            res.json(medidas)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    };

    public async buscarMedidasPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const medida = await db.getRepository(Medida).findOne({
                where: {
                    id: id
                },
                relations: {
                    estacao: true,
                    parametro: true,
                    estacao_has_parametros: true
                }
            });
            if (medida) {
                res.json(medida)
            } else {
                res.status(404).json("Medida não encontrada...")
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    };


    // 10, 11, 11, 15, 15, 15
    // [0, 1, 0, 4, 0, 0]
    public async buscarMedidasEstacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const estacao = await db.getRepository(Estacao).findOneBy({ id: Number(id) });
            if (!estacao) {
                throw "Estação não encontrada...";
            }
            const dados = await db.getRepository(Medida).find({
                where: {
                    estacao: estacao,
                },
                relations: {
                    parametro: true,
                },
                order: {
                    unixtime: 'ASC',
                },
            });

            const result = dados.reduce((acc, cur) => {
                const parametroTipo = cur.parametro.tipo;

                if(parametroTipo == 'Direcao do Vento'){
                    return acc
                }
                const medida = {
                    value: cur.valor_medido,
                    date: cur.unixtime,
                    unidade_medida: cur.parametro.unidade_medida,
                };
                if (acc[parametroTipo]) {
                    const lastIndex = acc[parametroTipo].data.length - 1;
                    const lastDate = acc[parametroTipo].data[lastIndex].date;
                    if (lastDate === cur.unixtime) {
                        acc[parametroTipo].data[lastIndex].value = cur.valor_medido;
                    } else {
                        acc[parametroTipo].data.push(medida);
                    }
                } else {
                    acc[parametroTipo] = {
                        name: parametroTipo,
                        data: [medida],
                    };
                }
                return acc;
            }, {});
            //console.log(result)

            const dadosTratados: {
                name: string;
                data: {
                    value: number;
                    date: string;
                    unidade_medida: string;
                }[];
            }[] = Object.values(result);


            if (dadosTratados.find((d) => d.name === 'Pluviometro')) {
                const pluviometroData = dadosTratados.find((d) => d.name === 'Pluviometro').data;
                const pluviometroValues = pluviometroData.map((d) => d.value);
                const pluviometroDifferences = pluviometroValues.filter((value, index)=> {
                    if (index > 0) {
                        return value - pluviometroValues[index - 1] >= 0;
                    } else {
                        return true;
                    }
                }).map((value, index) => {
                    if (index > 0) {
                        return value - pluviometroValues[index - 1];
                    } else {
                        return 0;
                    }
                });
                dadosTratados.find((d) => d.name === 'Pluviometro').data = pluviometroDifferences.map((value, index) => ({
                    value,
                    date: dadosTratados.find((d) => d.name === 'Pluviometro').data[index].date,
                    unidade_medida: 'mm',
                }));

            }

            return res.json(dadosTratados);
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }

    public async buscarUltimasMedidasRegistradas(req: Request, res: Response){
        try{
            const id_estacao = req.params.id
            const medidas = await db.getRepository(Medida).query(`
            SELECT sub.tipo, sub.valor_medido, sub.id, sub.unixtime, sub.unidade_medida, sub.descricao
            FROM (
                SELECT p.tipo, p.unidade_medida, p.descricao, m.valor_medido, m.unixtime, m.id, ROW_NUMBER() OVER (PARTITION BY p.tipo ORDER BY m.unixtime DESC) AS rn
                FROM medidas m
                JOIN estacoes_has_parametros ehp ON m.id_estacao_has_parametro = ehp.id
                JOIN parametros p ON ehp.id_parametro = p.id WHERE m.id_estacao = ${id_estacao}
            ) AS sub
            WHERE sub.rn = 1;
            `)
            res.status(200).json(medidas);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

}

export default new MedidaController()