import { CustomerEntity } from 'src/Customer/customerentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("Advisor")
export class AdvisorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Firstname: string;

  @Column()
  Lastname: string;

  @Column()
  Username: string;

  @Column()
  filename: string;

  @Column()
  Email: string;

  @Column()
  Mobile: string;

  @Column()
  Password: string;

  @OneToMany(()=> CustomerEntity,(customer)=>customer.advisor)
  customers:CustomerEntity[]

 
}




