import { Module } from '@nestjs/common';
import { grpcPostClientProvider } from './post-grpc-client.provider';
import { PostQueryResolver } from './post-query.resolver';
import { PostMutationResolver } from './post-mutation.resolver';
import { PostFieldResolver } from './post-field.resolver';
import { AuthorModule } from '../author/author.module';
import { CommonsModule } from '../common/common.module';
import { PostSubscriptionResolver } from './post-subscription.resolver';

@Module({
  imports: [AuthorModule, CommonsModule],
  controllers: [],
  providers: [
    grpcPostClientProvider,
    PostQueryResolver,
    PostMutationResolver,
    PostFieldResolver,
    PostSubscriptionResolver,
  ],
  exports: [grpcPostClientProvider],
})
export class PostModule {}
