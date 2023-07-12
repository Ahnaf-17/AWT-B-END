import { UserEntity } from "src/user/userentity.entity";
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./adminEntity.entity";

@Entity("adminSendMsg")
export class AdminSendMsg{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    Message : string
    


    @ManyToOne(()=> AdminEntity,(admin)=>admin.adminSendMsgs)
    admin:AdminEntity

    @ManyToOne(()=> UserEntity,(user)=>user.adminSendMsgs)
    user:UserEntity
}