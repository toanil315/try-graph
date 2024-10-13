import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PostModule } from './modules/post/post.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    PostModule,
    AuthorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.schema.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/gateway/src/modules/graphql/types.ts'),
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class GatewayModule {}
