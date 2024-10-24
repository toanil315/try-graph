import { Inject, Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { AUTHOR_SERVICE_NAME, AuthorServiceClient } from '../../proto/author';
import { ClientGrpcProxy } from '@nestjs/microservices';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  private authorService: AuthorServiceClient;

  constructor(
    @Inject('AUTHOR_PACKAGE')
    private readonly authorServiceClient: ClientGrpcProxy,
  ) {
    this.authorService =
      this.authorServiceClient.getService<AuthorServiceClient>(
        AUTHOR_SERVICE_NAME,
      );
  }

  public readonly batchAuthors = new DataLoader(async (authorIds: string[]) => {
    const users = await Promise.all(
      authorIds.map((authorId) =>
        this.authorService.getAuthorById({ id: authorId }).toPromise(),
      ),
    );
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return authorIds.map((authorId) => usersMap.get(authorId));
  });
}
