import { PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import Estacao from "./Estacao";
import Parametro from "./Parametro";
import Alerta from "./Alerta";

@Entity({name: "estacoes_has_parametros"})
class EstacaoHasParametros{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne((type) => Estacao, {onDelete:"CASCADE"})
    @JoinColumn({
        name: "id_estacao",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_estacao"
    })
    estacao: Estacao

    @ManyToOne((type) => Parametro, {onDelete:"CASCADE"})
    @JoinColumn({
        name:"id_parametro",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_parametro"
    })
    parametro: Parametro

    @ManyToOne((type) => Alerta, {nullable:true, onDelete:"SET NULL"})
    @JoinColumn({
        name:"id_alerta",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_alerta"
    })
    alerta: Alerta
}

export default EstacaoHasParametros
