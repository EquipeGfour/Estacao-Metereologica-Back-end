import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Estacao from "./Estacao";
import Parametro from "./Parametro";

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

    @ManyToOne((type) => Parametro)
    @JoinColumn({
        name:"id_parametro",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_parametro"
    })
    parametro: Parametro
}

export default EstacaoHasParametros
