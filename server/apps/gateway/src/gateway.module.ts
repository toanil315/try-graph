import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PostModule } from './modules/post/post.module';
import { AuthorModule } from './modules/author/author.module';
import { CommonsModule } from './modules/common/common.module';

@Module({
  imports: [
    CommonsModule,
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
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
})
export class GatewayModule {}
