import { Module } from '@nestjs/common';
import { PUBSUB_SERVICE_PROVIDER } from './pubsub.service.provider';

@Module({
  imports: [],
  providers: [PUBSUB_SERVICE_PROVIDER],
  exports: [PUBSUB_SERVICE_PROVIDER],
})
export class CommonsModule {}
