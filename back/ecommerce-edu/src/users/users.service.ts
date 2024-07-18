import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
    
    constructor(private readonly usersRepository: UsersRepository){}

    getUsersService(page: number, limit: number){
        return this.usersRepository.getUsersRepository(page, limit);
    }

    getUserByEmailService(email: string) {
        return this.usersRepository.getUserByEmailRepository(email);
    }

    getUserByIdService(id: string) {
        return this.usersRepository.getUserByIdRepository(id);
    }

    addUserService(user: Users) {
        return this.usersRepository.addUserRepository(user);
    }

    updateUserService(id: string, user: Users) {
        return this.usersRepository.updateUserRepository(id, user); 
    }

    deleteUserService(id: string) {
        return this.usersRepository.deleteUserRepository(id);
    }
}
