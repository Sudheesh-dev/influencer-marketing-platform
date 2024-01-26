import { Module } from '@nestjs/common';
import { RmqModule } from './modules/rmq/rmq.module';

@Module({
  imports: [RmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
