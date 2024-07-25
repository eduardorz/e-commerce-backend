import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async getAuth(){
        return 'for this time, the auth come like this'
    }

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.getUserByEmailRepository(email);
        if (!user) throw new BadRequestException('Credenciales Incorrectas');

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) throw new BadRequestException('Credenciales Incorrectas');
        
        const payload = { id: user.id, email: user.email }
        const token = this.jwtService.sign(payload);
        return {
            message: 'Usuario logueado',
            token,
        }
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
