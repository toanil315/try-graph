import { Module } from '@nestjs/common';
import { grpcAuthorClientProvider } from './author-grpc-client.provider';
import { AuthorQueryResolver } from './author-query.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [grpcAuthorClientProvider, AuthorQueryResolver],
  exports: [grpcAuthorClientProvider],
})
export class AuthorModule {}
