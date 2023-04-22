import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({name:'parametros'})
class Parametro{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tipo:string

    @Column()
    descricao: string

    @Column()
    unidade_medida:string

    @Column()
    fator_conversao:string

    @Column()
    offset:string
}

export default Parametro

