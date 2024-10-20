import { Inject, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { POST_SERVICE_NAME, PostServiceClient } from '../../proto/post';
import { firstValueFrom } from 'rxjs';

@Resolver('Post')
export class PostQueryResolver implements OnModuleInit {
  private postService: PostServiceClient;

  constructor(
    @Inject('POST_PACKAGE') private readonly clientService: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.postService =
      this.clientService.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @Query('getPosts')
  async getPosts() {
    const result = await firstValueFrom(this.postService.getPosts({}));
    return result.posts;
  }

  @Query('getPostById')
  async getPostById(
    @Args('id')
    id: string,
  ) {
    const post = await this.postService.getPostById({ id }).toPromise();
    if (!post.id) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Query('getPostComments')
  async getPostComments(
    @Args('postId')
    postId: string,
  ) {
    const comments = await this.postService
      .getPostComments({ postId })
      .toPromise();
    return comments.comments;
  }
}
