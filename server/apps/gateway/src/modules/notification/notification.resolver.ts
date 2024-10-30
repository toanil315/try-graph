import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../graphql/types';

@Resolver('Notification')
export class NotificationResolver {
  constructor(
    @Inject('PubSubService') private readonly pubSubService: PubSub,
  ) {}

  @Subscription('postCreatedEmit', {
    resolve: (value: Notification) => value,
  })
  commentAdded(): AsyncIterator<unknown, any, undefined> {
    return this.pubSubService.asyncIterator('postCreatedEmit');
  }
}
