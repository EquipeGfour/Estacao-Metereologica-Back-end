import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

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

    @Column()
    utc!: Date
};


export default Estacao;
