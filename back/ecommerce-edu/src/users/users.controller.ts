import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page?: string, @Query('limit') limit?: string){
        if (!page || !limit) return this.usersService.getUsersService(1, 5);
        return this.usersService.getUsersService(Number(page), Number(limit));
    }

    @Get(':email')
    getUserByEmail(@Param('email') email: string){
        return this.usersService.getUserByEmailService(email);
    }
    
    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.getUserByIdService(id)
    }

    @Put(':id')
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto){
        // VALIDAR QUE EL DTO RECIBA ALMENOS 1 DATO PARA MODIFICAR
        return this.usersService.updateUserService(id, user);
    }

    @Delete(':id')
    deleteUserController(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUserService(id);
    }
}
