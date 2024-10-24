import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const authorProtoPath = join(__dirname, './proto/author.proto');

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'author',
      protoPath: [authorProtoPath],
      url: '0.0.0.0:5013',
      maxSendMessageLength: 10485760,
      maxReceiveMessageLength: 10485760,
      loader: {
        includeDirs: ['./proto'],
        arrays: true,
        objects: true,
      },
      keepalive: {
        keepalivePermitWithoutCalls: 1,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3013, '0.0.0.0');
}
bootstrap();
