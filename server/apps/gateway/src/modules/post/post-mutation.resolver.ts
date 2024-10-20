import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PostServiceClient,
  CreatePostRequest,
  POST_SERVICE_NAME,
  Post,
  CreateCommentRequest,
} from '../../proto/post';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Post')
export class PostMutationResolver implements OnModuleInit {
  private postService: PostServiceClient;

  constructor(
    @Inject('POST_PACKAGE') private readonly clientService: ClientGrpc,
    @Inject('PubSubService') private readonly pubSubService: PubSub,
  ) {}

  onModuleInit(): void {
    this.postService =
      this.clientService.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @Mutation('createPost')
  async createPost(@Args('data') data: CreatePostRequest) {
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

  @Mutation('createComment')
  async createComment(
    @Args('data') createCommentRequest: CreateCommentRequest,
  ) {
    console.log('createCommentRequest', createCommentRequest);
    const newComment = await this.postService
      .createComment(createCommentRequest)
      .toPromise();
    this.pubSubService.publish('commentAdded', newComment);
  }
}
