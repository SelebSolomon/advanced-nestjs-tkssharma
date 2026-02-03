import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import type RequestWithUser from '../authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from 'src/utils/utilss/mongooseClassSerializer.interceptor';
import { Post as PostModel } from './schema/post.schema';
import PostsService from './post.service';
import { PaginationParams } from 'src/utils/utilss/paginationParams';
import ParamsWithId from 'src/utils/utilss/paramsWithId';
import PostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';

@Controller('posts')
@UseInterceptors(MongooseClassSerializerInterceptor(PostModel))
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query() { skip, limit, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }
}
