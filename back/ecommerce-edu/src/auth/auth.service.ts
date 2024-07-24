import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getAuth(){
        return 'for this time, the auth come like this'
    }

    async signIn(email: string, password: string) {
        if (!email || !password) return 'Credenciales Incorrectas';
        const user = await this.usersRepository.getUserByEmailRepository(email);
        if (!user) return 'Credenciales Incorrectas';
        if (user.password === password) return 'Usuario logueado!'
        return 'Credenciales Incorrectas'
    }

    async signUp(user: Partial<Users>){
        const { email, password } = user;
        const foundUser = await this.usersRepository.getUserByEmailRepository(email);
        if(foundUser) throw new BadRequestException('El mail ya se encuentra registrado');

        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.usersRepository.addUserRepository({
            ...user,
            password: hashedPassword,
        })
    }
}
