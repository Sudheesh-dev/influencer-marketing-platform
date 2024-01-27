import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RMQHandler {
  private readonly logger = new Logger(RMQHandler.name);

  @MessagePattern('sync_influencer_data')
  syncInfluencerDataHandler(data: number[]) {
    this.logger.log(data)
  }

}