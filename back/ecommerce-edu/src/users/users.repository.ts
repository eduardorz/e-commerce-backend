import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository {
    // simulando la base de datos
    private users: User[] = [
        {
            "id": 1,
            "email": "johndoe@example.com",
            "name": "John Doe",
            "password": "password1",
            "address": "123 Main St",
            "phone": "123-456-7890",
            "country": "USA",
            "city": "New York"
          },
          {
            "id": 2,
            "email": "janedoe@example.com",
            "name": "Jane Doe",
            "password": "password2",
            "address": "456 Oak St",
            "phone": "123-456-7891",
            "country": "Canada",
            "city": "Toronto"
          },
          {
            "id": 3,
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

    async updateUserRepository(id: number, user: User){
      const foundIndex = this.users.findIndex(user => Number(user.id) === Number(id));
      if(foundIndex === -1) {
        return  `No se encontro el usuario con el id ${id}`;
      } 
      this.users[foundIndex] = {...this.users[foundIndex], ...user};
      return this.users[foundIndex]; //* para consultar el usuario actualizado
    }

    async deleteUserRepository(id: number){
      const foundIndex = this.users.findIndex(user => Number(user.id) === Number(id));
      if(foundIndex === -1) return  `No se encontro el usuario con el id ${id}`;
      this.users.splice(foundIndex, 1);
      return `El usuario con el id ${id} ha sido eliminado`;
    }

    getUserByEmail(){}

}