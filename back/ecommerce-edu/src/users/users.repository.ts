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
        },
        {
          "id": 14,
          "email": "bobsmith@example.com",
          "name": "Bob Smith",
          "password": "password4",
          "address": "1011 Pine St",
          "phone": "123-456-7893",
          "country": "Australia",
          "city": "Sydney"
        },
        {
          "id": 15,
          "email": "charliejones@example.com",
          "name": "Charlie Jones",
          "password": "password5",
          "address": "1516 Maple St",
          "phone": "123-456-7894",
          "country": "Japan",
          "city": "Tokyo"
        },
        {
          "id": 21,
          "email": "emilydavis@example.com",
          "name": "Emily Davis",
          "password": "password6",
          "address": "2345 Oak St",
          "phone": "123-456-7895",
          "country": "Germany",
          "city": "Berlin"
        },
        {
          "id": 22,
          "email": "jamesbrown@example.com",
          "name": "James Brown",
          "password": "password7",
          "address": "3456 Elm St",
          "phone": "123-456-7896",
          "country": "France",
          "city": "Paris"
        },
        {
          "id": 23,
          "email": "sarahlee@example.com",
          "name": "Sarah Lee",
          "password": "password8",
          "address": "4567 Pine St",
          "phone": "123-456-7897",
          "country": "Spain",
          "city": "Madrid"
        },
        {
          "id": 24,
          "email": "markwilliams@example.com",
          "name": "Mark Williams",
          "password": "password9",
          "address": "5678 Maple St",
          "phone": "123-456-7898",
          "country": "Italy",
          "city": "Rome"
        },
        {
          "id": 25,
          "email": "jenniferclark@example.com",
          "name": "Jennifer Clark",
          "password": "password10",
          "address": "6789 Oak St",
          "phone": "123-456-7899",
          "country": "China",
          "city": "Beijing",
         },
         {
          "id": 31,
          "email": "michaelwilson@example.com",
          "name": "Michael Wilson",
          "password": "password11",
          "address": "789 Elm St",
          "phone": "123-456-7900",
          "country": "Canada",
          "city": "Vancouver"
        },
        {
          "id": 32,
          "email": "amandasmith@example.com",
          "name": "Amanda Smith",
          "password": "password12",
          "address": "1011 Pine St",
          "phone": "123-456-7901",
          "country": "Germany",
          "city": "Munich"
        },
        {
          "id": 33,
          "email": "davidbrown@example.com",
          "name": "David Brown",
          "password": "password13",
          "address": "1516 Maple St",
          "phone": "123-456-7902",
          "country": "France",
          "city": "Nice"
        },
        {
          "id": 34,
          "email": "juliasanchez@example.com",
          "name": "Julia Sanchez",
          "password": "password14",
          "address": "2345 Oak St",
          "phone": "123-456-7903",
          "country": "Italy",
          "city": "Venice"
        },
        {
          "id": 35,
          "email": "kevinnguyen@example.com",
          "name": "Kevin Nguyen",
          "password": "password15",
          "address": "3456 Elm St",
          "phone": "123-456-7904",
          "country": "Japan",
          "city": "Osaka"
        }
  ];

    async getUsersRepository(page: number, limit: number){
      const start = (page - 1) * limit;
      const end = start + limit;
      const usersList = this.users.slice(start, end);
      return usersList.map(({password, ...userNoPassword}) => userNoPassword);
    }

    async getUserByNameRepository(name: string) {
      return this.users.find((user) => user.name === name);
    }

    async getUserByIdRepository(id: number){
      const user = this.users.find((user) => Number(user.id) === Number(id));
      if(!user) return  `No se encontro el usuario con el id ${id}`;
      const {password, ...userNoPassword} = user;
      return userNoPassword;
    }

    async getUserByEmailRepository(email: string){
      return this.users.find((user) => user.email === email);
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

}