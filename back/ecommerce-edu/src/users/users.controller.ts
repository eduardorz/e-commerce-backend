import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

@Controller('users')
// EN CASO DE QUERER APLICAR LA GUARDA PARA TODOS LOS ENDPOINTS DE ESTE CONTROLADOR, DEBE IR A ESTA ALTURA
// @UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(@Query('name') name?: string, @Query('page') page?: string, @Query('limit') limit?: string){
        if (name && !(page || limit)){
            return this.usersService.getUserByNameService(name);
        } else if (!(name) && (page && limit)) {
            return this.usersService.getUsersService(Number(page), Number(limit));
        }
        return this.usersService.getUsersService(1, 5);
    }

    @Get('profile/images')
    @UseGuards(AuthGuard)
    getUserImages(){
        return 'Este endpoint retorna las imagenes del usuario'
    }

    @Get(':email')
    getUserByEmail(@Param('email') email: string){
        return this.usersService.getUserByEmailService(email);
    }
    
    // siempre que tenga un ':' debe ir a lo ultimo, en este caso, de los get
    @Get(':id')
    getUserById(@Param('id') id: number){
        return this.usersService.getUserByIdService(id) // OJO CON EL TIPO DE DATO DEL ID EN BD
    }

    @Post()
    @UseInterceptors(DateAdderInterceptor)
    addUser(@Body() user: User, @Req() request: Request & { now: string }){
        console.log('dentro del endpoint: ', request.now)
        return this.usersService.addUserService(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() user: User){
        return this.usersService.updateUserService(id, user);
    }

    @Delete(':id')
    deleteUserController(@Param('id') id: number) {
        return this.usersService.deleteUserService(id);
    }
}
