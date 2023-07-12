import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";
export class EmployeeUpdateForm{
    @IsNotEmpty({message: "Name cannot be empty"})
    @IsString({message: "Cannot accept this type name"})
    @Length(3,40, {message: "Name of length must have at least 3 letters or maximum 40 letters"})
    name: string;

    @IsNotEmpty({message: "Email cannot be empty"})
    @IsEmail({}, {message: "Invalid Email"})
    email: string;

    @IsNotEmpty({message: "Password must be fill up"})
    @IsString({message: "Cannot accept this type password"})
    @Length(8,25, {message: "Password must have at least 8 characters and maximum 25 characters"})
    password: string;

    @IsNotEmpty({message: "Age must be fill up"})
    @IsInt({message: "Invalid age"})
    @Min(16, {message: "You must be at least 16+ for join"})
    age: number;
}