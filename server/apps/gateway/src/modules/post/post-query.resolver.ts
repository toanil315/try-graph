import { Inject, OnModuleInit } from '@nestjs/common';
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
    return this.postService.getPostById({ id });
  }
}
