import { Injectable, Logger } from '@nestjs/common';
import { InfluencerStatisticsRMQService } from '../rmq/influencer-statistics-rmq.service';
import { InfluencerRepository } from './influencer.repository';
import { InfluencerStatistics } from './influencer-statistics.model';

@Injectable()
export class InfluencersService {
  private readonly logger = new Logger(InfluencersService.name);

  constructor(
    private readonly influencerStatisticsRMQService:InfluencerStatisticsRMQService,
    private readonly influencerRepository:InfluencerRepository
  ) {}

  async getInfluencerStatisticsById(influencerId: number): Promise<InfluencerStatistics> {
    try {
      const influencer = await this.influencerRepository.findOneById(influencerId);
      if (!influencer) {
        throw new Error(`Influencer with ID ${influencerId} not found`);
      }
      return influencer;
    } catch (error) {
      this.logger.error(`Error retrieving influencer with ID ${influencerId}: ${error.message}`);
      throw new Error(`Failed to retrieve influencer with ID ${influencerId}`);
    }
  }
  
}
