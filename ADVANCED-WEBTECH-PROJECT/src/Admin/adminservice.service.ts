import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { AdminEntity } from "./Entity/adminEntity.entity";
import {TermandCoEntity} from "./Entity/termandCoEntity.entity";
import {AdvisorEntity} from "src/Financial Advisor/advisorentity.entity";
import {UserEntity} from "src/user/userentity.entity";
import { AdminForm } from "./DTOs/adminform.dto";
import * as bcrypt from 'bcrypt';
import { AdminSendMsg } from "./Entity/adminSendMsg.entity";


@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
    private mailerService: MailerService,

    @InjectRepository(TermandCoEntity)
    private tocRepo: Repository<TermandCoEntity>,

    @InjectRepository(AdvisorEntity)
    private AdvisorRepo: Repository<AdvisorEntity>,

    @InjectRepository(UserEntity)
    private UserRepo: Repository<UserEntity>,

    @InjectRepository(AdminSendMsg)
    private msgRepo: Repository<AdminSendMsg>
    // @InjectRepository(UserEntity)
    // private userRepo:Repository<UserEntity>,

    
  ) {}


  async sendEmail(mydto){

    return   await this.mailerService.sendMail({
           to: mydto.email,
           subject: mydto.subject,
           text: mydto.text, 
         });
   }

    async viewProfile(session){
      if(session.email)
      {
      const mydata = await this.adminRepo.findOneBy({ email: session.email });
      return mydata;
      }
      else
      return "login first";
    }

    async getAllAdmins(session) {
      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });
        if (mydata) {
          const options: FindManyOptions<AdminEntity> = {};
          const admins = await this.adminRepo.find(options);
          return admins;
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
    }

    // async viewallcust(session) {
    //   if (session.email) {
    //     const mydata = await this.adminRepo.findOneBy({ email: session.email });
    //     if (mydata) {
    //       const options: FindManyOptions<UserEntity> = {};
    //       const customers = await this.userRepo.find(options);
    //       return customers;
    //     } else {
    //       return "Only admins have permission.";
    //     }
    //   } else {
    //     return "Please login first.";
    //   }
    // }

    async create(mydto:AdminForm) {
      const adminaccount = new AdminEntity()

      const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
      
      if(mydata) 
      {
        return 0;
      }

      adminaccount.name = mydto.name;
      adminaccount.uname = mydto.uname;
      adminaccount.mbl_no = mydto.mbl_no;
      adminaccount.birthDate = mydto.birthDate;
      adminaccount.email = mydto.email;
      adminaccount.password = mydto.password;
      adminaccount.address = mydto.address;

      
      
       return this.adminRepo.save(adminaccount);
        }

    async addDesc(session,mydto){

      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });

        if (mydata) {
           const ifAdded = await this.tocRepo.findOneBy({ adminEntity : mydata });

          if(ifAdded){
            return "already added"
          }
          else{
            const termandco = new TermandCoEntity()

            termandco.webdescription=mydto.webdescription;
            termandco.toc=mydto.toc;
            termandco.contact=mydto.contact;
            termandco.adminEntity=mydata;

            return this.tocRepo.save(termandco);
              }
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
    }

    async upDesc(session,mydto){

      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });

        if (mydata) {
           const ifAdded = await this.tocRepo.findOneBy({ adminEntity : mydata });

          if(!ifAdded){
            return "Not added"
          }
          else{

            const result = await this.tocRepo.update({ adminEntity: mydata }, mydto);

            try{
            if(result.affected===0){
              return "not updated";
            }
            else{
              return "updated";
            }
          }
          catch(err){
            console.log(err);
            return "error occured";
            
          }
              }
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
      
    }

    async delDesc(session,mydto){

      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });

        if (mydata) {
           const ifAdded = await this.tocRepo.findOneBy({ adminEntity : mydata });

          if(!ifAdded){
            return "Not added"
          }
          else{

            return this.tocRepo.delete(ifAdded);
              }
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
      
    }

    async viewDesc(session,mydto){

      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });

        if (mydata) {
           const ifAdded = await this.tocRepo.findOneBy({ adminEntity : mydata });

          if(!ifAdded){
            return "Not added"
          }
          else{

            return ifAdded;
              }
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
      
    }

      async signin(session,mydto) {

       // console.log(session.email);
        if(session.email){
          return 0;
        }
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        if (!mydata) {
          return 0;
        }
        //return mydata.password;
        // console.log(mydto.password);
        // console.log(mydata.password);
        if(mydto.password== mydata.password) 
        {
          return 1;
        }
        return 0;
      }

      async deleteAdmin(Adminemail) {
        const mydata = await this.adminRepo.findOneBy({ email:Adminemail });
        console.log(mydata);
        if(mydata)
        return this.adminRepo.delete(mydata);
        return false;
      }

      async deleteAdminById(session,dEmail:string) {

        if(dEmail){
        if(session.email){
          const mydata = await this.adminRepo.findOneBy({ email:session.email });
          if(mydata){
            
              const dltAdmin=await this.adminRepo.findOneBy({ email:dEmail });
              if(dltAdmin){
                return this.adminRepo.delete(dltAdmin);
              }
              else{
                return "email not found";
              }
          }
          else{
            return "Only admins can"
          }
        }
        else{
          return "Login first";
        }
      }
      else{
        return "wrong input";
      }
        
      }

      async updateAdmin(mydto: AdminForm, email: string){
        try {
          const result = await this.adminRepo.update({ email: email }, mydto);
          if (result.affected === 0) {
            // No rows were affected by the update
            return 'Admin not found';
          } else {
            // Update was successful
            return 'Admin updated';
          }
        } catch (err) {
          // An error occurred during the update operation
          console.error(err);
          return 'Update failed';
        }
      }

      async uploadDP(session,uFilename:string){
       // return "dhukse";
        try{
        if(session.email){

          const mydto = await this.adminRepo.findOneBy({ email: session.email });
          if(mydto.filename)
          return "DP already uploaded"
          mydto.filename=uFilename;
          const result = await this.adminRepo.save(mydto);
          if (!result) {
          return "File not uploaded"
        }
        else{
          return "File uploaded"
        }
      }
        else{
          return "Login first";
        }
      }
      catch(err){
        console.error(err);
        return "something is wrong"
      }
      }

      async updateDP(session,uFilename:string){
        // return "dhukse";
         try{
         if(session.email){
           const mydto = await this.adminRepo.findOneBy({ email: session.email });
           mydto.filename=uFilename;
           const result = await this.adminRepo.save(mydto);
           if (!result) {
           return "DP not updated"
         }
         else{
           return "DP updated"
         }
       }
         else{
           return "Login first";
         }
       }
       catch(err){
         console.error(err);
         return "something is wrong"
       }
       }

      async deleteDP(session){
        // return "dhukse";
         try{
         if(session.email){
           const mydto = await this.adminRepo.findOneBy({ email: session.email });
           if(!mydto.filename)
           return "there is not dp"
           mydto.filename=null;
           const result = await this.adminRepo.save(mydto);
           if (!result) {
           return "DP not deleted"
         }
         else{
           return "DP deleted"
         }
       }
         else{
           return "Login first";
         }
       }
       catch(err){
         console.error(err);
         return "something is wrong"
       }
       }  

       async viewAdvisors(session){
        if (session.email) {
          const mydata = await this.adminRepo.findOneBy({ email: session.email });
          if (mydata) {
            const options: FindManyOptions<AdvisorEntity> = {};
            const advisors = await this.AdvisorRepo.find(options);
            return advisors;
          } else {
            return "Only admins have permission.";
          }
        } else {
          return "Please login first.";
        }
       }

       async viewAdvisorById(session,mydto){
        if (session.email) {
          const mydata = await this.adminRepo.findOneBy({ email: session.email });
          if (mydata) {
            const advisor = await this.AdvisorRepo.findOneBy({ id: mydto.id });
            console.log(advisor)
            if(advisor)
              return advisor;
            else
              return "Not found";
          } else {
            return "Only admins have permission.";
          }
        } else {
          return "Please login first.";
        }
       }

       async sendMsgtoCustomer(session,mydto){
        if (session.email) {
          const mydata = await this.adminRepo.findOneBy({ email: session.email });
          if (mydata) {
            const customer = await this.UserRepo.findOneBy({ id: mydto.id });
            

            if(!customer)
              return "customer not found";

            const msg = new AdminSendMsg()

            console.log(msg)
            msg.Message=mydto.Message;
            msg.admin=mydata;
            msg.user=customer;

            return await this.msgRepo.save(msg);
          } else {
            return "Only admins have permission.";
          }
        } else {
          return "Please login first.";
        }
       }



}