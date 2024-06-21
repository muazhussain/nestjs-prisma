import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createUser(payload: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
        try {
            return await this.prismaService.user.create({
                data: {
                    ...payload,
                    userSetting: {
                        create: {
                            notificationOn: true,
                            smsEnabled: false,
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            return await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: parseInt(id),
                },
                include: {
                    userSetting: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            return await this.prismaService.user.findMany({
                include: {
                    userSetting: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, payload: Prisma.UserUpdateInput): Promise<Prisma.UserCreateInput> {
        try {
            return await this.prismaService.user.update({
                where: {
                    id: parseInt(id),
                },
                data: payload,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string): Promise<Prisma.UserCreateInput> {
        try {
            const user = await this.getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return await this.prismaService.user.delete({
                where: {
                    id: parseInt(id),
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateUserSetting(userId: number, payload: Prisma.UserSettingUpdateInput) {
        try {
            const user = await this.getUserById(userId.toString());
            if (!user) {
                throw new Error('User not found');
            }
            return await this.prismaService.userSetting.update({
                where: {
                    userId: userId,
                },
                data: payload,
            });
        } catch (error) {
            throw error;
        }
    }
}
