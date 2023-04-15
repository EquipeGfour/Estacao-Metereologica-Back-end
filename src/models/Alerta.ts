import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametro from "./Parametro";


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
    estacao: Estacao

    @ManyToOne((type) => Parametro, (parametro) => parametro.id)
    @JoinColumn({
        name:"id_parametro"
    })
    parametro: Parametro
}


export default Alerta
