import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers(){
        return 'all the users from the service too'
    }
}
