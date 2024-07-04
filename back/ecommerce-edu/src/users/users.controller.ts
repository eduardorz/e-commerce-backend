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
    getUsers(@Query('name') name?: string){
        if (name) return this.usersService.getUserByNameService(name);
        return this.usersService.getUsersService();
    }

    @Get('profile/images')
    @UseGuards(AuthGuard)
    getUserImages(){
        return 'Este endpoint retorna las imagenes del usuario'
    }

    // siempre que tenga un ':' debe ir a lo ultimo, en este caso, de los get
    @Get(':id')
    getUserById(@Param('id') id: string){
        return this.usersService.getUserByIdService(Number(id)) // OJO CON EL TIPO DE DATO DEL ID EN BD
    }

    @Post()
    @UseInterceptors(DateAdderInterceptor)
    createUser(@Body() user: User, @Req() request: Request & { now: string }){
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
