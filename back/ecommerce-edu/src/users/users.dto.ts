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

    /**
     * Debe ser un email
     * @example 'example@example.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Debe ser un string de entre 8 y 15 caracteres
     * Debe tener almenos una mayúscula, una minúscula, un número y un carácter especial
     * @example 'Abc123#$*'
     */
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

    /**
     * Debe ser un string de entre 8 y 15 caracteres
     * Debe tener almenos una mayúscula, una minúscula, un número y un carácter especial
     * @example 'Abc123#$*'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * Debe ser un string de entre 3 y 80 caracteres
     * @example 'Avenida de Prueba 123'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Debe ser un número 
     * @example '123456789'
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * Debe ser un string de entre 5 y 20 caracteres
     * @example 'Venezuela'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /**
     * Debe ser un string de entre 5 y 20 caracteres
     * @example 'Valencia'
     */
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
    /**
     * Debe ser un string de entre 3 y 80 caracteres
     * @example 'Juliana Daniela Rincon'
     */
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /**
     * Debe ser un email
     * @example 'example@example.com'
     */
    @IsOptional()
    @IsEmail()
    email: string;

    /**
     * Debe ser un string de entre 8 y 15 caracteres
     * Debe tener almenos una mayúscula, una minúscula, un número y un carácter especial
     * @example 'Abc123#$*'
     */
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
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * Debe ser un string de entre 3 y 80 caracteres
     * @example 'Avenida de Prueba 123'
     */
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Debe ser un número
     * @example '123456789'
     */
    @IsOptional()
    @IsNumber()
    phone: number;

    /**
     * Debe ser un string de entre 5 y 20 caracteres
     * @example 'Venezuela'
     */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /**
     * Debe ser un string de entre 5 y 20 caracteres
     * @example 'Valencia'
     */
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