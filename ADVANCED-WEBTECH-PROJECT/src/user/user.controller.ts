import { Body, Controller ,
     Delete, Get,Param, Patch,
     ParseIntPipe,UploadedFile, 
     Post, Put, Query, UsePipes, 
     ValidationPipe, Session, 
     UseGuards,ParseFilePipe,UseInterceptors,
     FileTypeValidator,MaxFileSizeValidator,Res} from "@nestjs/common";
// import { get } from "http";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserForm } from "./userform.dto";
import { UserService } from "./userservice.service";
import { SessionGuard } from './usersession.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller("/user")
    export class UserController{
        constructor(private userService: UserService){}
        @Get("/index")
        getUser(): any{
            return this.userService.getIndex();
        }
        @Get("/search/:id")
        getUserByID(@Param("id",ParseIntPipe)id:number):any{
            return this.userService.getUserByID(id);
        }
        @Get("/search/:id")
        getUserByuname(@Param("id",ParseIntPipe)username:string):any{
            return this.userService.getUserByID(username);
        }
        @Get("/search")
        getUserByName(@Query() qry:any): any {
          return this.userService.getUserByName(qry);
        }  

        @Get('/getimage/:name')
        getImages(@Param('name') name, @Res() res) {
          res.sendFile(name,{ root: './uploads' })
        }
        

        @Post("/insert")
        @UsePipes(new ValidationPipe())
        insertUser(@Body() mydto:UserForm): any {
            return this.userService.insertUser(mydto);
        }
        // @Put("/update/")
        // @UsePipes(new ValidationPipe())
        // update( 
        //   @Body("name") name:string, 
        //   @Body("id") id:number): any {
        // return this.userService.update(name, id);
        // }
        @Put('/userupdate')
        @UsePipes(new ValidationPipe())
        userupdate(
            @Session() session,
            @Body() mydto: UserForm): any {
            if(session.email){
                return this.userService.userupdate(mydto, session.email);
            }else{
                return "need to login"
            }
            
        }




        @Put("/updateuser/:id")
        @UsePipes(new ValidationPipe())
        updateUserbyid( 
            @Body("name") name:string, 
            @Param("id", ParseIntPipe) id:number): any {
          console.log(name);
              //  return this.userService.updatebyid(name,id);
          }


          @Delete("/deleteuser/:id")
          deleteUserbyid( 
          @Param("id", ParseIntPipe) id:number): any {
            return this.userService.deletebyid(id);
          }

          @Delete("/deleteCurrency")
          deleteCurrency(@Session() session){
            // @Param("id",ParseIntPipe) id:number): any{
                return this.userService.deleteCurrency(Session);
             }

            @Get("/history/:id")
            // tradehistory()
            tradehistory(@Param("id",ParseIntPipe)id:number):any{
                return this.userService.tradeHistory(id);
            }
            @Delete("/clearhistory/:id")
            clearHistory(
            @Param("id",ParseIntPipe) id:number): any{
                return this.userService.clearHistory(id);
            }
            @Post("/status/:id")
            @UsePipes(new ValidationPipe())
            postStatus(@Body() id): any {
                return this.userService.postStatus(id);
        }
            // @Put("/updateuser/:id")
            // updateStatus(@Body() id):any{ 
            // return this.userService.updateStatus(id);
            // }
            // post put patch
            // paeseint parsedouble

            @Post('/login')
           async login(@Session() session, @Body() mydto:UserForm){
            // console.log(mydto);
                const pass = this.userService.login(mydto)
            // if(this.userService.login(mydto)){
                if(await pass===1){
                session.email = mydto.email;
                
            return {message:"success"};
            }else{
                // return {message:"invalid credentials"};
                throw new UnauthorizedException({ message: "invalid" });

            }
            
            }

            // @Post('/signup')
            // @UsePipes(new ValidationPipe())
            // async create(@Body() mydto:UserForm) {
            //   const result = this.userService.insertUser(mydto);
            //   if(await result === 0) {
            //     return "an account has assigned to this email";
            //   } else {
            //    // console.log(result);
            //     return "account created";
            //   }
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
             signup(@Body() mydto:UserForm,@UploadedFile(  new ParseFilePipe({
             validators: [
                 new MaxFileSizeValidator({ maxSize: 2000000 }),
                 new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
             ],
             }),) file: Express.Multer.File){

            mydto.file = file.filename;  

            return this.userService.signup(mydto);
            console.log(file)
            }

            @Get('/logout')
            logout(@Session() session){
            if(session.email){
                session.destroy()
                return {message:"logged out successfully"};
            }else{
                throw new UnauthorizedException("Can't log out");
            }
        }

        @Post('/sendmail')
        sendEmail(@Body() mydata){
        return this.userService.sendEmail(mydata);
}

        @Get('/profile')
        view(@Session() session):any {
        return this.userService.view(session);
    }

    @Delete('/delete')
    deleteaccount(@Session() session) {
      
      if(session.email){
        if(this.userService.deleteaccount(session.email)){
            session.destroy();
            return "account deleted ";
      }
    }
      return "need to login first";
}
        @Patch('/updatefile')
        @UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        }
        })

        }))
        async updatefile(@Session() session,@UploadedFile(  new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 16000000 }),
            new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
        }),) file: Express.Multer.File){
        return this.userService.updatefile(session,file.filename);
        }

        @Delete('deletefile')
        deleteFile(@Session() session){
          return this.userService.deleteFile(session)
        }

        @Post('status')
        status(@Session() Session,@Body() body){
          return this.userService.status(Session,body);
        }

        @Delete('deletestatus')
        deleteStatus(@Session() session){
          return this.userService.deleteStatus(session)
        }




}
