import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InfluencerService } from '../influencers/influencer.service';
export type InfluencerId = number;
@Controller()
export class RMQHandler {
  private readonly logger = new Logger(RMQHandler.name);

  constructor(
    private readonly influencerService:InfluencerService
  ){}

  @MessagePattern('sync_influencer_data')
  syncInfluencerDataHandler(influencerIdList: InfluencerId[]) {
    try{
      this.logger.log("Influencer ID's received for processing ", influencerIdList)
      influencerIdList.forEach((influencerId) => {
        this.influencerService.fetchAndPublishNewInfluencerStatistics(influencerId)
      })
    }catch(error){
      this.logger.error(`Error syncing influencer data: ${error.message}`);
      throw new Error(`Error syncing influencer data`);
    }
  }

}