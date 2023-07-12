import { IsNotEmpty, IsInt, Length } from "class-validator";

export class UserUpdateForm{
    @Length(4,9)
    name: string
}