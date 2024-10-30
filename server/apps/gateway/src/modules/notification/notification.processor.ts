import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { PubSub } from 'graphql-subscriptions';
import { Post } from '../../proto/post';

@Injectable()
@Processor('notification-queue')
export class NotificationConsumer extends WorkerHost {
  constructor(@Inject('PubSubService') private readonly pubSubService: PubSub) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'create-notification-for-created-post': {
        const createdPost = job.data as Post;
        await this.pubSubService.publish('postCreatedEmit', {
          id: String(Date.now()),
          content: `Post ${createdPost.title} is created!`,
        });
        return;
      }

      default: {
        console.log('Unknown job: ', job.name);
        return;
      }
    }
  }
}
