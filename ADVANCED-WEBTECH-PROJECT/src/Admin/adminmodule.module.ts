import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminEntity } from "./Entity/adminEntity.entity";
import { AdminService } from "./adminservice.service"
import { TermandCoEntity } from "./Entity/termandCoEntity.entity";
import { AdvisorEntity } from "src/Financial Advisor/advisorentity.entity";
import { CustomerEntity } from 'src/Customer/customerentity.entity';
import { AdminSendMsg } from "./Entity/adminSendMsg.entity";
import { UserEntity } from "src/user/userentity.entity";


@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'mostaquenaimislam@gmail.com',
                           pass: 'vwaxokzhcyjpldl' //missing i
                       },
                      }
          }
          
          ),
        TypeOrmModule.forFeature([AdminEntity,TermandCoEntity,AdvisorEntity,CustomerEntity,AdminSendMsg,UserEntity])],
controllers: [AdminController],
providers: [AdminService],
})

export class AdminModule {}