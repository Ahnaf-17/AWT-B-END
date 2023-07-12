import { AdvisorEntity } from 'src/Financial Advisor/advisorentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
@Entity("Customer")
export class CustomerEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Firstname: string;

  @Column()
  Lastname: string;

  @Column()
  Username: string;

  @Column()
  Email: string;

  @Column()
  Mobile: string;

  @Column()
  Password: string;

  @ManyToOne(()=>AdvisorEntity,(advisor)=> advisor.customers)

@JoinColumn({name:"AdvisorId", referencedColumnName: "id"})
  advisor:AdvisorEntity

 
}