import { Module } from '@nestjs/common';
import { AuthorController } from './app.controller';
import { AuthorService } from './app.service';

@Module({
  imports: [],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AppModule {}
