import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Parent, ResolveField } from '@nestjs/graphql';
import { AUTHOR_SERVICE_NAME, AuthorServiceClient } from '../../proto/author';
import { Author, Post } from '../../proto/post';
import { firstValueFrom } from 'rxjs';

@Resolver('Post')
export class PostFieldResolver implements OnModuleInit {
  private authorService: AuthorServiceClient;

  constructor(
    @Inject('AUTHOR_PACKAGE')
    private readonly authorServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.authorService =
      this.authorServiceClient.getService<AuthorServiceClient>(
        AUTHOR_SERVICE_NAME,
      );
  }

  @ResolveField('author')
  async getAuthor(@Parent() post: Post): Promise<Author> {
    return firstValueFrom(
      this.authorService.getAuthorById({ id: post.authorId }),
    );
  }
}
