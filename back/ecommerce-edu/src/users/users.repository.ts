import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository {
    // simulando la base de datos
    private users: User[] = [
        {
            "id": 11,
            "email": "johndoe@example.com",
            "name": "John Doe",
            "password": "password1",
            "address": "123 Main St",
            "phone": "123-456-7890",
            "country": "USA",
            "city": "New York"
          },
          {
            "id": 12,
            "email": "janedoe@example.com",
            "name": "Jane Doe",
            "password": "password2",
            "address": "456 Oak St",
            "phone": "123-456-7891",
            "country": "Canada",
            "city": "Toronto"
          },
          {
            "id": 13,
            "email": "alicetaylor@example.com",
            "name": "Alice Taylor",
            "password": "password3",
            "address": "789 Elm St",
            "phone": "123-456-7892",
            "country": "UK",
            "city": "London"
          }
    ]

    async getUsersRepository(){
        return this.users;
    }

    async getUserByNameRepository(name: string) {
      return this.users.find((user) => user.name === name);
    }

    async getUserByIdRepository(id: number){
      return this.users.find((user) => user.id === id);
    }

    async addUserRepository(user: Omit<User, 'id'>){
      const id = this.users.length + 1;
      this.users = [ ... this.users, { id, ... user}];
      return { id, ... user};
    }

    async updateUserRepository(){}

    async deleteUserRepository(){}

    getUserByEmail(){}

}