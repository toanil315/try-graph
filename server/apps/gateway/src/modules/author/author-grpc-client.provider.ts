import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcAuthorClientProvider: Provider = {
  provide: 'AUTHOR_PACKAGE',
  useFactory: () => {
    const authorProtoPath = join(__dirname, './proto/author.proto');

    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: 'author',
        protoPath: [authorProtoPath],
        url: '0.0.0.0:5013',
        loader: {
          defaults: true,
        },
        maxSendMessageLength: 10485760,
        maxReceiveMessageLength: 10485760,
      },
    });
  },
  inject: [],
};
