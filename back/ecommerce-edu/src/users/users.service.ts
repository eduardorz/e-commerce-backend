import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    
    constructor(private readonly usersRepository: UsersRepository){}

    getUsersService(page: number, limit: number){
        return this.usersRepository.getUsersRepository(page, limit);
    }

    getUserByNameService(name: string) {
        return this.usersRepository.getUserByNameRepository(name);
    }

    getUserByEmailService(email: string) {
        return this.usersRepository.getUserByEmailRepository(email);
    }

    getUserByIdService(id: number) {
        return this.usersRepository.getUserByIdRepository(id);
    }

    addUserService(user: Omit<User, 'id'>): Promise<User> {
        return this.usersRepository.addUserRepository(user);
    }

    updateUserService(id: number, user: User) {
        return this.usersRepository.updateUserRepository(id, user); 
    }

    deleteUserService(id: number) {
        return this.usersRepository.deleteUserRepository(id);
    }
}
