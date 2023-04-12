import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";


@Entity({name:'alertas'})
class Alerta{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nome: string

    @Column()
    mensagem: string

    @Column()
    condicao: string

    @Column()
    duracao: number

    @ManyToOne((type) => EstacaoHasParametros)
    @JoinColumn({
        name:"id_estacao_has_parametro",
        referencedColumnName:"id",
        foreignKeyConstraintName: "fk_estacao_has_parametro_id"
    })
    id_estacao_has_parametros: EstacaoHasParametros

    @ManyToOne((type) => EstacaoHasParametros)
    @JoinColumn({
        name:"id_estacao",
        referencedColumnName:"estacao",
        foreignKeyConstraintName:"fk_id_estacao"
    })
    id_estacao: EstacaoHasParametros

    @ManyToOne((type) => EstacaoHasParametros)
    @JoinColumn({
        name:"id_parametro",
        referencedColumnName:"parametro",
        foreignKeyConstraintName:"fk_id_parametro"
    })
    id_parametro: EstacaoHasParametros
}


export default Alerta
