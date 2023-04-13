import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, Double, ManyToOne, JoinColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametros from "./Parametros";

@Entity({name: 'medidas'})
class Medidas{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    unixtime: number

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

    @ManyToOne((type) => Parametros, (parametro) => parametro.id)
    @JoinColumn({
        name:"id_parametro"
    })
    id_parametro: Parametros
}

export default Medidas