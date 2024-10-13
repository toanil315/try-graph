import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTHOR_SERVICE_NAME, AuthorServiceClient } from '../../proto/author';
import { firstValueFrom } from 'rxjs';

@Resolver('Author')
export class AuthorQueryResolver implements OnModuleInit {
  private authorService: AuthorServiceClient;

  constructor(
    @Inject('AUTHOR_PACKAGE') private readonly clientService: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.authorService =
      this.clientService.getService<AuthorServiceClient>(AUTHOR_SERVICE_NAME);
  }

  @Query('getAuthors')
  async getAuthors() {
    const result = await firstValueFrom(this.authorService.getAuthors({}));
    return result.authors;
  }

  @Query('getAuthorById')
  async getAuthorById(
    @Args('id')
    id: string,
  ) {
    return this.authorService.getAuthorById({ id });
  }
}
