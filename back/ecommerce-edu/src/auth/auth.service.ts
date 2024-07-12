import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

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
}
