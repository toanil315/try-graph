import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { Author, Post } from '../../proto/post';
import PostsLoaders from './post.loader';

@Resolver('Post')
export class PostFieldResolver {
  constructor(private postLoader: PostsLoaders) {}

  @ResolveField('author')
  async getAuthor(@Parent() post: Post): Promise<Author> {
    return this.postLoader.batchAuthors.load(post.authorId);
  }
}
