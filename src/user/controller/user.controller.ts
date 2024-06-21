import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserSettingDto } from '../dto/userSetting-update.dto';

@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    async createUser(@Body() payload: CreateUserDto) {
        try {
            return await this.userService.createUser(payload);
        } catch (error) {
            console.error(error);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            return await this.userService.getUserById(id);
        } catch (error) {
            console.error(error);
        }
    }

    @Get()
    async getUsers() {
        try {
            return await this.userService.getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        try {
            return await this.userService.updateUser(id, payload);
        } catch (error) {
            console.error(error);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            return await this.userService.deleteUser(id);
        } catch (error) {
            console.error(error);
        }
    }

    @Patch(':id/setting')
    async updateUserSetting(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserSettingDto) {
        try {
            return await this.userService.updateUserSetting(id, payload);
        } catch (error) {
            console.error(error);
        }
    }
}
