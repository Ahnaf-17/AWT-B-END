import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseFloatPipe, ParseIntPipe, Patch, Post, Put, Query, Req, Request, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminForm } from "./DTOs/adminform.dto";
import { AdminService } from "./adminservice.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './adminSession.guard';
import { Console } from "console";
import { get } from "http";

@Controller("/admin")
export class AdminController
{ 
  constructor(private adminService: AdminService){}

  
  //add new admin user
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async create(@Body() mydto:AdminForm) {
    const result = this.adminService.create(mydto);
    if(await result === 0) {
      return "email already signed up";
    } else {
     // console.log(result);
      return "account created";
    }
  }
  

  //Login to admin account 
  @Post('/signin')
async signin(@Session() session, @Body() mydto:AdminForm) {
  const isMatch= this.adminService.signin(session,mydto);

  //console.log(isMatch);
  if (await isMatch==1) {
    session.email = mydto.email;
  //  console.log(session.email);
    return { message: "Welcome" };
  } else {
    return { message: "Something is wrong" };
  }
}

//logout
@Get('/logout')
logout(@Session() session)
{
  
  if(session.email)
  {
    session.destroy()
    return {message:"you are logged out successfully"};
  }
  else
  {
    throw new UnauthorizedException("Can't log out");
  }
}

@Put('/updateadmin')
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Session() session,
    @Body() mydto: AdminForm
  ): any {
    if(session.email)
    return this.adminService.updateAdmin(mydto, session.email);
    else
    return "LOG IN FIRST"
  }

  //delete id
  @Delete('delete')
  deleteAdmin(@Session() session) {
    
    if(session.email)
    {
    if(this.adminService.deleteAdmin(session.email))
    {
    session.destroy();
    return "Deleted successfully";
    }
    }
    return "Must login first";
  }

  @Delete('deleteAdminById')
  @UsePipes(new ValidationPipe())
   deleteAdminById(
    @Session() session,
    @Body("email") email:string, 
  ) {
    return this.adminService.deleteAdminById(session,email);
  }

  //index as default
  @Get('/profile')
  viewProfile(@Session() session):any {
    return this.adminService.viewProfile(session);
    
  }

  //add t&c
  @Post('addDesc')
  addDesc(@Session() Session,@Body() body){
    return this.adminService.addDesc(Session,body);
  }

  //update
  @Put('upDesc')
  upDesc(@Session() Session,@Body() body){
    return this.adminService.upDesc(Session,body);
  }

  @Delete('delDesc')
  delDesc(@Session() Session,@Body() body){
    return this.adminService.delDesc(Session,body);
  }

  @Get('viewDesc')
  viewDesc(@Session() Session,@Body() body){
    return this.adminService.viewDesc(Session,body);
  }
  //view all customer
  // @Get('viewallcust')
  // viewallcust(@Session() session):any{
  //   return this.adminService.viewallcust(session);
  // }

  //find an id
  // @Get('/:id')
  // findOne(@Param('id') id) {
  //   return this.adminService.findOne(id);
  // }

  @Post('/UploadDP')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })

  }))
  async uploadDP(@Session() session,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  return this.adminService.uploadDP(session,file.filename);
  }

  @Patch('/UpdateDP')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })

  }))
  async updateDP(@Session() session,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  return this.adminService.updateDP(session,file.filename);
  }

  @Delete('deleteDP')
  deleteDP(@Session() session){
    return this.adminService.deleteDP(session)
  }

  @Get('/admins')
  async getAllAdmins(@Session() session) {
    return this.adminService.getAllAdmins(session);
  }

  @Post('sendemail')
  sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}

  @Get('viewAdvisors')
  viewAdvisors(@Session() session){
    return this.adminService.viewAdvisors(session);
  }
  
  @Post('viewAdvisorById')
  viewAdvisorById(@Session() session,@Body() body){
    return this.adminService.viewAdvisorById(session,body);
  }

  @Post('sendMsgtoEmployee')
  sendMsgtoCustomer(@Session() Session,@Body() body){
    return this.adminService.sendMsgtoCustomer(Session,body);
  }
}