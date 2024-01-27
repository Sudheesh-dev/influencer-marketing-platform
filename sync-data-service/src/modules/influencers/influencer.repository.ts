import { Injectable } from '@nestjs/common';
import { InfluencerStatistics } from './influencer-statistics.model';

@Injectable()
export class InfluencerRepository{
  async findOneById(id: number): Promise<InfluencerStatistics | null> {
    const sampleData:InfluencerStatistics = {
        averageInfluencerCount: Math.ceil(Math.random()*10000),
        totalNoOfRecords:Math.ceil(Math.random()*1000)
    }
    return sampleData;
  }
}
