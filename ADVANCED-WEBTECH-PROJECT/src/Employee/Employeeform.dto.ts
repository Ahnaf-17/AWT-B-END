import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Min,Matches } from "class-validator";
export class EmployeeForm{
    @IsNotEmpty({message: "ID not found"})
    @IsInt()
    id: number;

    @IsNotEmpty({message: "Name cannot be empty"})
    @IsString({message: "Cannot accept this type name"})
    @Length(3,40, {message: "Name of length must have at least 3 letters or maximum 40 letters"})
    name: string;

    @IsNotEmpty({message: "Email cannot be empty"})
    @IsEmail({}, {message: "Invalid Email"})
    email: string;

    @IsNotEmpty({message: "Password must be fill up"})
    @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
    @IsString({message: "Cannot accept this type password"})
    @Length(8,25, {message: "Password must have at least 8 characters and maximum 25 characters"})
    password: string;

    @IsNotEmpty({message: "Age must be fill up"})
    @IsInt({message: "Invalid age"})
    @Min(16, {message: "You must be at least 16+ for join"})
    age: number;
}