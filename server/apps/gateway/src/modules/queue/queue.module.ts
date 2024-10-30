import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationQueueModule } from './notification-queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        password: 'redis123',
      },
    }),
    NotificationQueueModule,
  ],
  providers: [],
  exports: [NotificationQueueModule],
})
export class QueueModule {}
