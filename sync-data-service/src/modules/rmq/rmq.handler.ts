import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
export type InfluencerId = number;
@Controller()
export class RMQHandler {
  private readonly logger = new Logger(RMQHandler.name);

  @MessagePattern('sync_influencer_data')
  syncInfluencerDataHandler(data: InfluencerId[]) {
    this.logger.log(data)
  }

}