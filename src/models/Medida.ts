import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, Double, ManyToOne, JoinColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametro from "./Parametro";


@Entity({name: 'medidas'})
class Medida{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    unixtime: Date

    @Column({type:'float'})
    valor_medido: Double

    @ManyToOne((type) => EstacaoHasParametros)
    @JoinColumn({
        name:"id_estacao_has_parametro",
        referencedColumnName:"id",
        foreignKeyConstraintName: "fk_medidas_estacao_has_parametro_id"
    })
    id_estacao_has_parametros: EstacaoHasParametros

    @ManyToOne((type) => Estacao, (estacao) => estacao.id)
    @JoinColumn({
        name:"id_estacao"
    })
    id_estacao: Estacao

    @ManyToOne((type) => Parametro, (parametro) => parametro.id)
    @JoinColumn({
        name:"id_parametro"
    })
    id_parametro: Parametro
}

export default Medida