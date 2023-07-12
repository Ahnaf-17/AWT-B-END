import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";
import { CustomerEntity } from "./customerentity.entity";


@Module({
imports: [TypeOrmModule.forFeature([CustomerEntity,AdminSendMsg ])],
controllers: [],
providers: [],
})

export class CustomerModule {}