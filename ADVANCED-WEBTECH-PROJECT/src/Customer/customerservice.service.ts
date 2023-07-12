import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from "./customerentity.entity";
import { CustomerForm } from "./customerform.dto";


@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>
      ) {}

    insertCustomer(mydto:CustomerForm):any {
    
        const advisoraccount = new CustomerEntity()
        // advisoraccount.id = mydto.id;
        advisoraccount.Firstname = mydto.Firstname;
        advisoraccount.Lastname = mydto.Lastname;
        advisoraccount.Username = mydto.Username;
        advisoraccount.Email = mydto.Email;
        advisoraccount.Mobile = mydto.Mobile;
        advisoraccount.Password = mydto.Password;
       
       return this.customerRepo.save(advisoraccount);
    }

viewAllCustomer(): any { 
    return this.customerRepo.find(); 

}

getCustomerByID(id):any {
    
    return this.customerRepo.findOneBy({ id });
    
}

}

