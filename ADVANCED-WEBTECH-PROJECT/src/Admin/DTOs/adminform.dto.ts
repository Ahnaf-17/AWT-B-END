import { IsDate, IsInt, IsNotEmpty, Length, Matches } from "class-validator";

export class AdminForm {   

    id:number

    @IsNotEmpty()
    @Length(4,25,{message: "name must be the size of between 4 and 25",})
    name: string;


    @IsNotEmpty()
    @Length(6,16,{message: "username must be the size of between 6 and 16"})
    @Matches(/^[a-zA-Z0-9]+$/, {
        message:'username must not have anything other than letters and numbers',
      })
    uname: string;

    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,}$/, {
        message:'Password must be equal or more than 6 characters long with at least 1 special character, 1 capital letter, 1 small and 1 digit',
      })

    password: string;


    @IsNotEmpty()
    @Matches(/^(01)[3,5,6,7,8,9][0-9]{8}$/, {
        message:'Mobile no. is not correct',
      })

    mbl_no: string;

    @IsNotEmpty()
    birthDate:string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    email: string;
    
  filename: string;

    
}