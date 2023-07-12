import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvisorEntity} from "./advisorentity.entity";
// import { AdvisorForm } from "./advisorform.dto";
import * as bcrypt from 'bcrypt';
import { AdvisorFormUpdate } from "./advisorformupdate.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class AdvisorService {

    constructor(
        @InjectRepository(AdvisorEntity)
        private advisorRepo: Repository<AdvisorEntity>,
        private mailerService: MailerService
      ) {}


// registration(mydto:AdvisorForm):any {
    
//     const advisoraccount = new AdvisorEntity()
    
//     advisoraccount.Firstname = mydto.Firstname;
//     advisoraccount.Lastname = mydto.Lastname;
//     advisoraccount.Username = mydto.Username;
//     advisoraccount.Email = mydto.Email;
//     advisoraccount.Mobile = mydto.Mobile;
//     advisoraccount.Password = mydto.Password;
   
//    return this.advisorRepo.save(advisoraccount);
// }

async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.Password, salt);
    mydto.Password= hassedpassed;
    return this.advisorRepo.save(mydto);
    }

    async signin(mydto){
        // console.log(mydto.Password);
    const mydata= await this.advisorRepo.findOneBy({Username: mydto.Username});
    const isMatch= await bcrypt.compare(mydto.Password, mydata.Password);
    if(isMatch) {
    return 1;
    }
    else {
        return 0;
    }
    
    }

    async updateProfileById(mydto:AdvisorFormUpdate,id) {
        const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.Password, salt);
    mydto.Password= hassedpassed;
        return this.advisorRepo.update(id,mydto);
           }

    getProfile(id):any {
    
            return this.advisorRepo.findOneBy({ id });
            
        }

    async updateProfile(Password,Username){
        const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(Password, salt);
    Password= hassedpassed;
            return this.advisorRepo.update({Username:Username},{Password:Password});
            }

deleteProfile(id):any {
    
    return this.advisorRepo.delete(id);
    }

async sendEmail(mydata){
        return   await this.mailerService.sendMail({
               to: mydata.email,
               subject: mydata.subject,
               text: mydata.text, 
             });
            }
    

}