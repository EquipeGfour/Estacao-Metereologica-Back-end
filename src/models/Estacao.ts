import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate , ManyToMany, JoinTable} from "typeorm";
import Parametros from "./Parametros";

@Entity({name:'estacoes'})
class Estacao{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nome:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable:false })
    data_criacao: Date;

    @Column()
    latitude:string

    @Column()
    longitude:string

    @Column()
    utc: Date
};


export default Estacao;
