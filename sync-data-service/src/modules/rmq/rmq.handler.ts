import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RMQHandler {
  @MessagePattern('sync_influencer_data')
  accumulate(data: number[]) {
    console.log(data)
  }
}