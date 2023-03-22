import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import Estacao from "./Estacao";

@Entity({name:'parametros'})
class Parametros{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    tipo!:string

    @Column()
    unidade_medida!:string

    @Column()
    fator_conversao!:string

    @Column()
    offset!:string
}

export default Parametros

