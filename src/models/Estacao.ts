import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

type Status = 'ativo' | 'desativado';

@Entity({name:'estacoes'})
class Estacao{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique: true})
    uid:string

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

    @Column({
        type: "enum",
        enum: ["ativo", "desativado"],
        default: "ativo"
    })
    status: Status
};


export default Estacao;
