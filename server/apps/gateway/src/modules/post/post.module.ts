import { Module } from '@nestjs/common';
import { grpcPostClientProvider } from './post-grpc-client.provider';
import { PostQueryResolver } from './post-query.resolver';
import { PostMutationResolver } from './post-mutation.resolver';
import { PostFieldResolver } from './post-field.resolver';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [AuthorModule],
  controllers: [],
  providers: [
    grpcPostClientProvider,
    PostQueryResolver,
    PostMutationResolver,
    PostFieldResolver,
  ],
  exports: [grpcPostClientProvider],
})
export class PostModule {}
