import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto {

    /**
     * Debe ser un string de entre 3 y 80 caracteres
     * @example 'Juliana Daniela Rincon'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsOptional()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}

export class LoginUserDto extends PickType (CreateUserDto, [
    'email',
    'password'
]) {}