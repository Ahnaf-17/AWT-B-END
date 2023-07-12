import { Injectable } from '@nestjs/common';

import { EmployeeForm } from "./Employeeform.dto";
import { EmployeeUpdateForm } from './employeeupdateform.dto';

@Injectable()
export class EmployeeService {
  getIndex():string {
    return "Employee Index";
  }

  getEmployeeList():string {
    return "Get All Employee Info";
  }

  getTrainerList():string {
    return "Get All Trainer Info";
  }

  getEmployee(qry):any {
    return "Location: "+qry.location+" and Hours:"+qry.hours;
  }

  getTrainer(qry):any {
    return "Location: "+qry.location+" and Hours:"+qry.hours;
  }

  NewEmployee(mydto:EmployeeForm):any {
    return "Employee Inserted ID: "+mydto.id+", Name " +mydto.name+", and Email: "+mydto.email+ ", and Password: "+mydto.password+", Age: "+mydto.age;
  }

  updateEmployeebyId(mydto:EmployeeUpdateForm, id):any {
    return "Update Employee where id "+id+" and change name to "+mydto.name+", Email to "+mydto.email+", Password to "+mydto.password+", Age to "+mydto.age;
  }

  deleteEmployeebyId(id):any {
    return "Delete Employee where id is "+id;
  }
/*
  PostQuestion(mydto:EmployeeForm):any {
    return "Employee Inserted question"+mydto.question;
  }

  UpdateQuestion(question,id):any {
    return "Update Employee where id "+id+" and change question to "+question;
  }

  DeleteQuestion(id):any {
    return "Delete question where id "+id;
  }

  getAllQuestion():string {
    return "All Question";
  } */
}
