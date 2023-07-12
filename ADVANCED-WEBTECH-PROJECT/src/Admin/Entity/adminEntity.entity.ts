import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminSendMsg } from "./adminSendMsg.entity";

@Entity("admin")
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name : string
    @Column()
    uname : string
    @Column()
    address : string
    @Column()
    password : string
    @Column({ unique: true })
    @Index({ unique: true })
    email: string;
    @Column()
    birthDate : string
    @Column()
    mbl_no : string
    @Column({ nullable: true })
    filename:string

    @OneToMany(()=> AdminSendMsg,(adminSendMsg)=>adminSendMsg.admin)
    adminSendMsgs:AdminSendMsg[]

}