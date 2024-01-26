import { Module } from '@nestjs/common';
import { RMQHandler } from './rmq.handler';

@Module({
  providers: [],
  exports:[],
  controllers:[RMQHandler]
})
export class RmqModule {}
