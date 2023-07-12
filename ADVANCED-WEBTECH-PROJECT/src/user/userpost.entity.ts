import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";


@Entity("status")
export class UserPostEntity{
    @PrimaryGeneratedColumn()
    id: number;
    // @Column()
    // name : string
    // @Column()
    // username : string
    @Column({nullable:true})
    status: string

    @OneToMany(()=> AdminSendMsg,(adminSendMsg)=>adminSendMsg.user)
    adminSendMsgs:AdminSendMsg[]
}