import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        try {
            return await this.prismaService.post.create({
                data: {
                    ...data,
                    userId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getPosts() {
        try {
            return await this.prismaService.post.findMany({
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async createGroupPost(userIds: number[], data: Prisma.GroupPostCreateWithoutUserInput) {
        try {
            return await this.prismaService.groupPost.create({
                data: {
                    ...data,
                    user: {
                        create: userIds.map((userId) => ({ userId: userId })),
                    }
                },
            });
        }catch(error) {
            throw error;
        }
    }

    async getGroupPosts() {
        try {
            return await this.prismaService.groupPost.findMany({
                include: {
                    user: {
                        include: {
                            user: true,
                        }
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    
}
