  import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors, Session, UseGuards } from "@nestjs/common";

  import { AdvisorForm} from "./advisorform.dto";
  import { AdvisorService } from "./advisorservice.service";
  import { CustomerService } from "src/Customer/customerservice.service";
  import { CustomerForm } from "src/Customer/customerform.dto";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { diskStorage } from "multer";
  import { UnauthorizedException } from "@nestjs/common";
  import { SessionGuard } from "./session.guard";
  import { AdvisorFormUpdate } from "./advisorformupdate.dto";



  @Controller("/advisor")
  export class AdvisorController
  { 
    constructor(private advisorService: AdvisorService,
      private customerService: CustomerService){}

    @Post("/insertCustomer")
    @UsePipes(new ValidationPipe())
    insertCustomer(@Body() mydto:CustomerForm): any {
      return this.customerService.insertCustomer(mydto);
    }
    
    @Get("/viewAllCustomer")
      getCustomer(): any { 
          return this.customerService.viewAllCustomer();
      }

      @Get("/findCustomer/:id")
      getCustomerByID(@Param("id", ParseIntPipe) id:number,): any {
        return this.customerService.getCustomerByID(id);
      }



    //   @Post("/registration")
    // @UsePipes(new ValidationPipe())
    // registration(@Body() mydto:AdvisorForm): any {
    //   return this.advisorService.registration(mydto);
    // }

    @Post('/signup')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })

  }))
  signup(@Body() mydto:AdvisorForm,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 40000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){

  mydto.filename = file.filename;  

  return this.advisorService.signup(mydto);
  // console.log(file)
  }

  @Get('/signin')

  signin(@Session() session, @Body() mydto:AdvisorForm)
  {
  if(this.advisorService.signin(mydto))
  {
    session.Username = mydto.Username;

    console.log(session.Username);
    return {message:"success"};

  }
  else
  {
    return {message:"invalid credentials"};
  } 
  }

  @Get("/viewProfile/:id")
  getProfile(@Param("id", ParseIntPipe) id:number,): any {
    return this.advisorService.getProfile(id);
  }

  @Put('/updateadvisor/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateProfile(@Session() session,@Body('Password') Password: string): any {
    console.log(session.Username);
    return this.advisorService.updateProfile(Password,session.Username);
  }

  @Put('/updateProfile/:id')
  @UsePipes(new ValidationPipe())
  updateProfileById(
    @Body() mydto: AdvisorFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.advisorService.updateProfileById(mydto, id);
  }



  @Get('/signout')
  signout(@Session() session)
  {
    if(session.destroy())
    {
      return {message:"you are logged out"};
    }
    else
    {
      throw new UnauthorizedException("invalid actions");
    }
  } 


      @Delete("/deleteadvisor/:id")
      deleteProfile( 
      @Param("id", ParseIntPipe) id:number
        ): any {
      return this.advisorService.deleteProfile(id);
      }

      @Post('/sendemail')
sendEmail(@Body() mydata){
return this.advisorService.sendEmail(mydata);
}


  }
