import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdvisorController } from "./advisor.controller"
import { AdvisorService } from "./advisorservice.service"
import { AdvisorEntity } from "./advisorentity.entity"
import { CustomerService } from "src/Customer/customerservice.service";
import { CustomerEntity } from "src/Customer/customerentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'adeepto04@gmail.com',
                   pass: 'pueufuepjkoqzxjo'
               },
              }
  }),TypeOrmModule.forFeature([AdvisorEntity,CustomerEntity])],
controllers: [AdvisorController],
providers: [AdvisorService,CustomerService],

})

export class AdvisorModule {}