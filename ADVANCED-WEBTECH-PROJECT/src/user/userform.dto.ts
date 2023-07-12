// export class UserForm{
//     @IsNotEmpty({messege: "enter yout id"})
//     id:number;
// }
import { MESSAGES } from "@nestjs/core/constants";
import { IsInt, isNotEmpty, IsNotEmpty, Length, Matches } from "class-validator";
export class UserForm {   
    // @IsNotEmpty({message: "Please enter your id and it must be a number"}) 
    // @IsInt()
    // @Matches()
    id: number;

    @IsNotEmpty()
    // @Length(3,8)
    @Matches('^[a-z]+$')
    name: string;

    @IsNotEmpty()
    // alphanumeric characters and - are valid
    // you can change this as you like
    @Matches(/^[a-zA-Z]+$/, {message:'username must not have anything other than letters and numbers'})
    @Length(4,20)
    username: string;

    @IsNotEmpty()
    @Length(3)
    @Matches(/^[a-zA-Z]+$/, {message:'username must not have anything other than letters and numbers'})
    currency: string;

    @IsNotEmpty()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
        message:'Password must be equal or more than 8 characters long with at least 1 special character, 1 capital letter, 1 small and 1 digit'})
        password: string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/, { message:'please follow the pattern'})

    @IsNotEmpty()
    email: string;

    file: string;
    status: string;

    
}