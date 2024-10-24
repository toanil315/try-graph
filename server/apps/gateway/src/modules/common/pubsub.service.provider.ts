import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis, RedisOptions } from 'ioredis';

export const PUBSUB_SERVICE_PROVIDER = {
  provide: 'PubSubService',
  useFactory: async (): Promise<RedisPubSub> => {
    const redisOptions: RedisOptions = {
      host: 'localhost',
      port: 6379,
      password: 'redis123',
    };

    return new RedisPubSub({
      publisher: new Redis(redisOptions),
      subscriber: new Redis(redisOptions),
    });
  },
  inject: [],
};
