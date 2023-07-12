import { Module } from '@nestjs/common';
import { EmployeeController } from './Employee.controller';
import { EmployeeService } from './Employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
