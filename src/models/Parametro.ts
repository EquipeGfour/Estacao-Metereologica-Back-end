import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({name:'parametros'})
class Parametro{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tipo:string

    @Column({length:400})
    descricao: string

    @Column()
    unidade_medida:string

    @Column()
    fator_conversao:string

    @Column()
    offset:string
}

export default Parametro
