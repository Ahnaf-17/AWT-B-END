import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import { EmployeeForm } from "./Employeeform.dto";
import { EmployeeUpdateForm } from "./employeeupdateform.dto";
import { EmployeeService } from "./Employee.service";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";

@Controller('/Employee')
export class EmployeeController {
    constructor(private EmployeeService: EmployeeService) {}

    @Get("/index")
    getEmployee():any {
        return this.EmployeeService.getIndex();
    }

    @Get("/employeelist")
    getEmployeeList():any {
        return this.EmployeeService.getEmployeeList();
    }

    @Get("/trainerlist")
    getTrainerList():any {
        return this.EmployeeService.getTrainerList();
    }

  

    @Get("/findtrainer")
    getTrainer(@Query() qry:any): any {
        return this.EmployeeService.getTrainer(qry);
    }

    @Post("/Employeereg")
    @UsePipes(new ValidationPipe())
    NewEmployee(@Body() mydto:EmployeeForm): any {
        return this.EmployeeService.NewEmployee(mydto);
    }

    @Put("/updateEmployee/:id")
    @UsePipes(new ValidationPipe())
    updateEmployeebyId(
        @Body() mydto:EmployeeUpdateForm,
        @Param("id", ParseIntPipe) id:number
    ): any {
        return this.EmployeeService.updateEmployeebyId(mydto,id);
    }

    @Delete("/deleteEmployee/:id")
    deleteEmployeebyId(
        @Param("id", ParseIntPipe) id:number
    ): any {
        return this.EmployeeService.deleteEmployeebyId(id);
    }
/*
    @Post("/postquestion")
    PostQuestion(@Body() mydto:EmployeeForm):any {
        return this.EmployeeService.PostQuestion(mydto)
    }

    @Put("/updatequestion/:id")
    UpdateQuestion(
        @Body("question") question:string,
        @Param('id', ParseIntPipe) id:number
    ): any {
        return this.EmployeeService.UpdateQuestion(question,id);
    }

    @Delete("/deletequestion/:id")
    DeleteQuestion(
        @Param("id", ParseIntPipe) id:number
    ): any {
        return this.EmployeeService.DeleteQuestion(id);
    }
    
    @Get("/allquestion")
    getAllQuestion():any {
        return this.EmployeeService.getAllQuestion();
    } */
}
