import {IsInt, Matches, MinLength, MaxLength, IsNotEmpty, IsEmail, IsString } from "class-validator";
export  class CustomerForm { 

    // @IsNotEmpty({message: "Please enter an id"}) 
    // @IsInt()
    // id: number;
    @IsString() 
    @IsNotEmpty() 
    Firstname: string;

    @IsString() 
    @IsNotEmpty() 
    Lastname: string;

    @IsString() 
    @IsNotEmpty() 
    @MinLength(3)
    @MaxLength(20)
    // @Matches(/^[a-zA-Z]+[0-9]+$/,{message:"Please enter an username with at least one lowercase letter, one upercase letter and one number"})
    Username: string;
    
    @IsEmail()
    @IsNotEmpty({message: "Please enter your Email Address"})
    Email: string;
    
    @IsString() 
    @IsNotEmpty({message: "Please enter your number "})
    @MaxLength(11)
    Mobile:string;

    @IsString() 
    @IsNotEmpty() 
    @MinLength(8)
    @MaxLength(20)
    // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,{message:"Please enter a strong password with minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte"})
    Password: string;

    @IsNotEmpty() 
    AdvisorId: number;

}