import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PostsService from './posts.service';
import FindOneParams from '../../utils/findOneParams';
import PostDto from './post.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  createPost(@Body() postData: PostDto) {
    return this.postsService.createPost(postData);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() postData: PostDto) {
    return this.postsService.updatePost(Number(id), postData);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
