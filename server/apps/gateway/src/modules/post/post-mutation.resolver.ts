import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PostServiceClient,
  CreatePostRequest,
  POST_SERVICE_NAME,
  Post,
} from '../../proto/post';

@Resolver('Post')
export class PostMutationResolver implements OnModuleInit {
  private postService: PostServiceClient;

  constructor(
    @Inject('POST_PACKAGE') private readonly clientService: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.postService =
      this.clientService.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @Mutation('createPost')
  async createPost(@Args('data') data: CreatePostRequest) {
    console.log('createPost', data);
    return this.postService.createPost(data);
  }

  @Mutation('updatePost')
  async updatePost(
    @Args('data') data: CreatePostRequest,
    @Args('id') id: string,
  ) {
    return this.postService.updatePost({
      id,
      ...data,
    } as unknown as Post);
  }

  @Mutation('deletePost')
  async deletePost(@Args('id') id: string) {
    return this.postService.deletePost({
      id,
    });
  }
}
