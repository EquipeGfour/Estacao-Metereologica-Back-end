import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import EstacaoHasParametros from "./EstacaoHasParametros";
import Estacao from "./Estacao";
import Parametro from "./Parametro";
import Alerta from "./Alerta";
import Medida from "./Medida";


@Entity({name:"registro_alertas"})
class RegistroAlerta{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    unixtime:Date

    @Column()
    longitude:string

    @Column()
    latitude:string

    @ManyToOne((type) => EstacaoHasParametros)
    @JoinColumn({
        name:"id_estacao_has_parametro",
        referencedColumnName:"id",
        foreignKeyConstraintName: "fk_registro_alerta_estacao_has_parametro_id"
    })
    estacao_has_parametros: EstacaoHasParametros

    @ManyToOne((type) => Estacao, (estacao) => estacao.id)
    @JoinColumn({
        name:"id_estacao"
    })
    estacao: Estacao

    @ManyToOne((type) => Parametro, (parametro) => parametro.id)
    @JoinColumn({
        name:"id_parametro",
        referencedColumnName:"id",
        foreignKeyConstraintName: "fk_registro_alerta_estacao_id"
    })
    parametro: Parametro

    @ManyToOne((type) => Alerta, (alerta) => alerta.id)
    @JoinColumn({
        name:"id_alerta",
        referencedColumnName: "id",
        foreignKeyConstraintName:"fk_registro_alerta_parametro_id"
    })
    alerta: Alerta

    @ManyToOne((type) => Medida, (medida) => medida.id)
    @JoinColumn({
        name:"id_medida",
        referencedColumnName: "id",
        foreignKeyConstraintName:"fk_registro_alerta_medida_id"
    })
    medida: Medida
}

export default RegistroAlerta;
