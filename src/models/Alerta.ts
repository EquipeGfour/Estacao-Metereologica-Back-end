import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametros from "./Parametros";


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


export default Alerta
