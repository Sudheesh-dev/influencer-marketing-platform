import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockStagramInfluencerStatistics } from './mockstagram-influencer-statistics.model';

@Injectable()
export class MockstagramService {
  private readonly logger = new Logger(MockstagramService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
 ) {}

  async getInfluencerDataById(id: number): Promise<MockStagramInfluencerStatistics> {
    try {
      const response = await this.httpService.axiosRef.get(this.configService.get("MOCKSTAGRAM_INFLUENCER_DATA_API"));
      if (!response?.data) {
        const errorMessage = `Influencer with ID ${id} not found`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      return {
        followerCount:Math.ceil(Math.random()*10000),
        timeStamp:Date.now()
      };
    } catch (error) {
      this.logger.error(`Error retrieving influencer data for ID ${id}: ${error.message}`);
      throw new Error(`Failed to retrieve influencer data for ID ${id}`);
    }
  }
}
