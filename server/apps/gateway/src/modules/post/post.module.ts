import { Module } from '@nestjs/common';
import { grpcPostClientProvider } from './post-grpc-client.provider';
import { PostQueryResolver } from './post-query.resolver';
import { PostMutationResolver } from './post-mutation.resolver';
import { PostFieldResolver } from './post-field.resolver';
import { AuthorModule } from '../author/author.module';
import { CommonsModule } from '../common/common.module';
import { PostSubscriptionResolver } from './post-subscription.resolver';
import PostsLoaders from './post.loader';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [AuthorModule, CommonsModule, QueueModule],
  controllers: [],
  providers: [
    grpcPostClientProvider,
    PostQueryResolver,
    PostMutationResolver,
    PostFieldResolver,
    PostSubscriptionResolver,
    PostsLoaders,
  ],
  exports: [grpcPostClientProvider],
})
export class PostModule {}
