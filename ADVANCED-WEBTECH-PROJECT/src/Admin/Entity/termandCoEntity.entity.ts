import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./adminEntity.entity";

@Entity("termandco")
export class TermandCoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    toc: string;
    @Column({ nullable: true })
    webdescription:string;
    @Column({ nullable: true })
    contact:string;

    @OneToOne(() => AdminEntity)
    @JoinColumn()
    adminEntity: AdminEntity
}