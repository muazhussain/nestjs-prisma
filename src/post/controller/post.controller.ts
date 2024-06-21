import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateGroupPostDto } from '../dto/create-group-post.dto';

@Controller('post')
@UsePipes(ValidationPipe)
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) { }

    @Post()
    async createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
        try {
            return await this.postService.createPost(userId, createPostData);
        } catch (error) {
            console.error(error);
        }
    }

    @Get()
    async getPosts() {
        try {
            return await this.postService.getPosts();
        } catch (error) {
            console.error(error);
        }
    }

    @Post('group')
    async createGroupPost(@Body() { userIds, ...createGroupPostData }: CreateGroupPostDto) {
        try {
            return await this.postService.createGroupPost(userIds, createGroupPostData);
        } catch (error) {
            console.error(error);
        }
    }

    @Get('group')
    async getGroupPosts() {
        try {
            return await this.postService.getGroupPosts();
        } catch (error) {
            console.error(error);
        }
    }
}
