import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'alertas'})
class Alerta{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nome: string

    @Column()
    mensagem: string

    @Column()
    tipo: string

    @Column({type:"float"})
    valor: Double

}

export default Alerta
