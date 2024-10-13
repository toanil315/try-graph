import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcPostClientProvider: Provider = {
  provide: 'POST_PACKAGE',
  useFactory: () => {
    const postProtoPath = join(__dirname, './proto/post.proto');

    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: 'post',
        protoPath: [postProtoPath],
        url: '0.0.0.0:5012',
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
