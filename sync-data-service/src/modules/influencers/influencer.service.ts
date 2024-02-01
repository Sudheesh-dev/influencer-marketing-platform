import { Injectable, Logger } from '@nestjs/common';
import { InfluencerStatisticsRMQService } from '../rmq/influencer-statistics-rmq.service';
import { InfluencerRepository } from './influencer.repository';
import { InfluencerStatistics } from './influencer-statistics.model';
import { MockStagramInfluencerStatistics } from '../mockstagram/mockstagram-influencer-statistics.model';
import { MockstagramService } from '../mockstagram/mockstagram.service';
import { InfluencerId } from '../rmq/rmq.handler';

@Injectable()
export class InfluencerService {
  private readonly logger = new Logger(InfluencerService.name);

  constructor(
    private readonly influencerStatisticsRMQService:InfluencerStatisticsRMQService,
    private readonly influencerRepository:InfluencerRepository,
    private readonly mockstagramService:MockstagramService
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

  calculateNewAverageFollowerCount(currentInfluencerStatistics:InfluencerStatistics, mockStagramInfluencerStatistics:MockStagramInfluencerStatistics):number{
    const currentAvgFollowers = currentInfluencerStatistics.averageInfluencerCount
    const currentRecordsCount = currentInfluencerStatistics.totalNoOfRecords
    const newFollowerCount = mockStagramInfluencerStatistics.followerCount
    return Math.floor(((currentAvgFollowers/(currentRecordsCount+1))*currentRecordsCount) + (newFollowerCount/(currentRecordsCount+1)))
  }

  async fetchAndPublishNewInfluencerStatistics(influencerId: InfluencerId): Promise<void> {
    try {
      const currentInfluencerStatistics = await this.getInfluencerStatisticsById(influencerId);
      const latestMockStagramInfluencerStatistics = await this.mockstagramService.getInfluencerDataById(influencerId)
      const newAverageFollowerCount = this.calculateNewAverageFollowerCount(currentInfluencerStatistics, latestMockStagramInfluencerStatistics);
      const updatedInfluencerStatistics:InfluencerStatistics = {
        id:influencerId,
        averageInfluencerCount:newAverageFollowerCount,
        totalNoOfRecords : currentInfluencerStatistics.totalNoOfRecords + 1
      }
      await this.influencerRepository.update(updatedInfluencerStatistics)
      const updatedData = {
        influencerId,
        newAverageFollowerCount,
        latestMockStagramInfluencerStatistics
      }
      this.logger.log("Updated influencer data", updatedData)
      await this.influencerStatisticsRMQService.pushToQueue(JSON.stringify(updatedData));
      this.logger.log(`Published new average follower count ${newAverageFollowerCount} for influencer ${influencerId} to RMQ`);
    } catch (error) {
      this.logger.error(`Error fetching and publishing influencer stats for ID ${influencerId}: ${error.message}`);
      throw new Error(`Failed to fetch and publish influencer stats for ID ${influencerId}`);
    }
  }

}
