import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    getAuth(){
        return 'for this time, the auth come like this'
    }
}
