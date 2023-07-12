import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";


@Entity("user")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    name : string
    @Column()
    username : string
    @Column({nullable: true})
    currency : string
    @Column()
    password : string
    @Column()
    email : string
    @Column({ nullable: true })
    file: string
    @Column({nullable:true})
    status: string

    @OneToMany(()=> AdminSendMsg,(adminSendMsg)=>adminSendMsg.user)
    adminSendMsgs:AdminSendMsg[]
}