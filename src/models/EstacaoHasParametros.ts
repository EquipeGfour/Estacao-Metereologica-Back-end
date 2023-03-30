import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Estacao from "./Estacao";
import Parametros from "./Parametros";

@Entity({name: "estacoes_has_parametros"})
class EstacaoHasParametros{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne((type => Estacao))
    @JoinColumn({
        name: "id_estacao",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_estacao"
    })
    estacao: Estacao

    @ManyToOne((type) => Parametros)
    @JoinColumn({
        name:"id_parametro",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_parametro"
    })
    parametro: Parametros
}

export default EstacaoHasParametros
