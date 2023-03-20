import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate , ManyToMany, JoinTable} from "typeorm";
import Parametros from "./Parametros";

@Entity({name:'estacoes'})
class Estacao{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    nome!:string

    @Column()
    data_criacao!:Date

    @Column()
    latitude!:string

    @Column()
    longitude!:string

    @ManyToMany((type) => Parametros)
    @JoinTable()
    parametros!:Parametros[]

    @Column()
    utc!: Date
};


export default Estacao;
