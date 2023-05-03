import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type TipoUsuario = "Admin" | "Usuario" | "Visitante";

@Entity({name:'usuarios'})
class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome:string

    @Column({unique:true})
    email:string

    @Column()
    senha:string

    @Column({
        type: 'enum',
        enum: ["Admin", "Usuario", "Visitante"],
        default: "Usuario"
    })
    tipo_usuario: TipoUsuario
};

export default Usuario;
