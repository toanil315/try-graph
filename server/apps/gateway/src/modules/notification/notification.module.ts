import { Module } from '@nestjs/common';
import { NotificationResolver } from './notification.resolver';
import { CommonsModule } from '../common/common.module';
import { NotificationQueueModule } from '../queue/notification-queue.module';
import { NotificationConsumer } from './notification.processor';

@Module({
  imports: [CommonsModule, NotificationQueueModule],
  controllers: [],
  providers: [NotificationResolver, NotificationConsumer],
  exports: [NotificationResolver],
})
export class NotificationModule {}
