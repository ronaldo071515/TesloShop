import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty({
        description: 'Email user',
        required: true
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password user',
        required: true
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        description: 'Full Name user',
        required: true,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    fullName: string;
    
}