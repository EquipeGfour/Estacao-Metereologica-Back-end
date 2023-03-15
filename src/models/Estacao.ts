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
    latitude!:number

    @Column()
    longitude!:number

    @Column()
    utc!: Date
};


export default Estacao;
