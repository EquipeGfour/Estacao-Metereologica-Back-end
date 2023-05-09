import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, Double, ManyToOne, JoinColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametro from "./Parametro";
import Alerta from "./Alerta";


@Entity({name: 'medidas'})
class Medida{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    unixtime: Date

    @Column({type:'float'})
    valor_medido: Double

    @ManyToOne((type) => EstacaoHasParametros, {onDelete:"CASCADE"})
    @JoinColumn({
        name:"id_estacao_has_parametro",
        referencedColumnName:"id",
        foreignKeyConstraintName: "fk_medidas_estacao_has_parametro_id"
    })
    estacao_has_parametros: EstacaoHasParametros

    @ManyToOne((type) => Estacao, (estacao) => estacao.id, {onDelete:"CASCADE"})
    @JoinColumn({
        name:"id_estacao"
    })
    estacao: Estacao

    @ManyToOne((type) => Parametro, (parametro) => parametro.id, {onDelete:"CASCADE"})
    @JoinColumn({
        name:"id_parametro"
    })
    parametro: Parametro

    @ManyToOne((type) => Alerta, (alerta) => alerta.id, {onDelete:"CASCADE"})
    @JoinColumn({name:"id_alerta"})
    alerta: Alerta
}

export default Medida