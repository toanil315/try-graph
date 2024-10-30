import { BullModule } from '@nestjs/bullmq';

export const NotificationQueueModule = BullModule.registerQueue({
  name: 'notification-queue',
});
