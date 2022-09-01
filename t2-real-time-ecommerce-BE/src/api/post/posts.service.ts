import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './post.entity';
import PostDto from './post.dto';

@Injectable()
class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async getPosts() {
    return await this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({id});
    if (post) {
      return post;
    }
    throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async createPost(postData: PostDto) {
    const newPost = await this.postsRepository.create(postData);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, postData: PostDto) {
    await this.postsRepository.update(id, postData);
    const updatedPost = await this.postsRepository.findOneBy({id});
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}

export default PostsService;
