import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    valor: string

}

export default Alerta
