import { Injectable } from "@nestjs/common";
import { UserEntity } from "./userentity.entity";
import { UserForm } from "./userform.dto";
import {Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from 'bcrypt';
import { UserPostEntity } from "./userpost.entity";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private mailerService: MailerService,

        @InjectRepository(UserPostEntity)
        private postRepo: Repository<UserPostEntity>,

        
    ){}

    getIndex():any{
      return this.userRepo.find();
    }
    // insertUser(mydto:AdminForm):any {
    //     return "inserted name : "+mydto.name +" and id is " +mydto.id;
    // }
    getUserByID(id):any {
    
        // return "id is "+id;
        return this.userRepo.findOneBy({ id });

    }
    getUserByuname(username):any {
    
      // return "id is "+id;
      return this.userRepo.findOneBy({ username });

  }


    getUserByName(qry):any {
    
        // return "the id is "+qry.id +" and name is "+qry.name;
        return this.userRepo.findOneBy({id:qry.id,name:qry.name})
    }
    async insertUser(mydto:UserForm) {
        const useraccount = new UserEntity()
        const mydata = await this.userRepo.findOneBy({email: mydto.email});
        if(mydata){
            return 0;
        }else

        useraccount.name = mydto.name;
        useraccount.username = mydto.username;
        useraccount.currency= mydto.currency;
        useraccount.password = mydto.password;
        useraccount.email = mydto.email;
        return this.userRepo.save(useraccount) 
    
        // return "Inserted name: " + mydto.name+" and id is " + mydto.id +",users currency is : "+mydto.currency +"and uname is "+mydto.username;
    }
    update(name,id):any {

        return this.userRepo.update({name:name},{name:name});
        return "updated name: " +name+" and id is " +id;
    }

    // update(name,id):any {
    //     console.log(name+id);
    //     return this.userRepo.update(id,{name:name})
    //     // return "updated name: " +name+" and id is " +id;
    // }

    async userupdate(mydto: UserForm, email: string){
        try {
          const result = await this.userRepo.update({ email: email }, mydto);
          if (result.affected === 0) {
            return 'no user found';
          } else {
            return ' updated successfully';
          }
        } catch (error) {
          console.error(error);
          return 'request failed';
        }
      }




    updatebyid(name,id):any {
        console.log(name+id);
        return this.userRepo.update(id,{name:name})
        // return "Update admin where id " +id+" and change name to " +name;
        // return "Updated name of id "+id+ " is "+ name;
    }
    deletebyid(id):any {
    
        // return "Delete id is "+id;
        return this.userRepo.delete(id)
    }
    addCurrency(id):any{
        return 
    }
    deleteCurrencyById(id):any{
        return "currency deleted ";
    }
    tradeHistory(id):any{
        return "trade history";
    }
    clearHistory(id):any{
        return "all clear";
    }
    postStatus(id):any {
    
        return "status posted";
    }
    updateStatus(id):any{
        return "status updated";
    }
    updatePassword(password,id):any{
        return
    }

    // async signup(mydto){
    //     const salt =await bcrypt.genSalt()
    // }

    async login(mydto){
        // console.log(mydto.password);
    const mydata= await this.userRepo.findOneBy({email: mydto.email});
    console.log(mydata);
    if(mydata){
    const isMatch= await bcrypt.compare(mydto.password, mydata.password);
    console.log(isMatch);
    if(isMatch) {
    return 1;
    }
    else {
        return 0;
    }
}
return 0;
}

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.userRepo.save(mydto);
        }


        async sendEmail(mydata){
            return await this.mailerService.sendMail({
                   to: mydata.email,
                   subject: mydata.subject,
                   text: mydata.text, 
                 });
           }


           async view(session){
            if(session.email){
                const mydata = await this.userRepo.findOneBy({ email: session.email });
                return mydata;
            }else
                return "login required";
          }

          async deleteaccount(useremail) {
            const mydata = await this.userRepo.findOneBy({ email:useremail });
            console.log(mydata);
            if(mydata)
            return this.userRepo.delete(mydata);
            return false;
          }
    
          async updatefile(session,updateFil:string){
             try{
             if(session.email){
               const mydto = await this.userRepo.findOneBy({ email: session.email });
               mydto.file=updateFil;
               const result = await this.userRepo.save(mydto);
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
        async deleteFile(session){
             try{
             if(session.email){
               const mydto = await this.userRepo.findOneBy({ email: session.email });
               if(!mydto.file)
               return "there is no profile picture"
               mydto.file=null;
               const result = await this.userRepo.save(mydto);
               if (!result) {
                return "unseuccessful"
             }
             else{
               return "deleted"
             }
           }
             else{
               return "need to login";
             }
           }
           catch(err){
             console.error(err);
             return "something went wrong"
           }
        }  
    
    async deleteCurrency(session){
        try{
            if(session.email){
                const mydto = await this.userRepo.findOneBy({email:session.email})
                if(!mydto.currency)
                    return "no currency"
                    mydto.currency=null;
                    const result = await this.userRepo.save(mydto);
                if(!result){
                    return "unsuccessful"
                }else{
                return "deleted"
            }
            }else{
                return "need to login"
            }            
            }catch(error){
                console.error(error);
                return "something went wrong"
        }
    }

    async status(session,mydto){
        if (session.email) {
          const mydata = await this.userRepo.findOneBy({ email: session.email });
  
              const post = new UserPostEntity()
              post.status=mydto.status;
  
              return this.postRepo.save(post);
            } else {
            return "login required";
          }
        // } else {
        //   return "Please login first.";
        // }
      }
      async deleteStatus(session){
        try{
            if(session.email){
                const mydto = await this.userRepo.findOneBy({email:session.email})
                if(!mydto.status)
                    return "no status"
                    mydto.status=null;
                    const result = await this.userRepo.save(mydto);
                if(!result){
                    return "unsuccessful"
                }else{
                return "deleted"
            }
            }else{
                return "need to login"
            }            
            }catch(error){
                console.error(error);
                return "something went wrong"
        }
    }
  

    


        


}