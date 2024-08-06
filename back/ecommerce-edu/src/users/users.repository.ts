import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.interface";
import { Users } from "src/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor (
      @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {}

    async getUsersRepository(page: number, limit: number){
      const start = (page - 1) * limit;
      const users = await this.usersRepository.find({
        take: limit,
        skip: start, 
      });
      return users.map(({password, isAdmin, ...userNoPassword}) => userNoPassword);
    }
    
    async getUserByIdRepository(id: string){
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          orders: true,
        },
      });
      if(!user) throw new NotFoundException(`No se encontro el usuario con el id ${id}`);
      const {password, ...userNoPassword} = user;
      return userNoPassword;
    }

    async getUserByEmailRepository(email: string){
      return await this.usersRepository.findOneBy({ email });
    }

    async addUserRepository(user: Partial<Users>){
      const newUser = await this.usersRepository.save(user);
      const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
      const { password, ...userNoPassword } = dbUser;
      return userNoPassword;
    }

    async updateUserRepository(id: string, user: Partial<Users>){
      await this.usersRepository.update(id, user);
      const updatedUser = await this.usersRepository.findOneBy({ id });
      const { password, ...userNoPassword } = updatedUser;
      return userNoPassword;
    }

    async deleteUserRepository(id: string){
      const user = await this.usersRepository.findOneBy({ id });
      this.usersRepository.remove(user);
      const { password, ...userNoPassword } = user;
      return userNoPassword;
    }

}