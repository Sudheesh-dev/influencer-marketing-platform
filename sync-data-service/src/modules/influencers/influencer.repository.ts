import { Injectable } from '@nestjs/common';
import { InfluencerStatistics } from './influencer-statistics.model';
export interface IinfluencerStatisticsTableModel {
  [key:number]: InfluencerStatistics
}
const influencerStatisticsTable:IinfluencerStatisticsTableModel = {}

@Injectable()
export class InfluencerRepository{
  async findOneById(id: number): Promise<InfluencerStatistics | null> {
    if(influencerStatisticsTable[id]){
      console.log(`Influencer data for ID ${id} found in table`)
      return influencerStatisticsTable[id];
    }
    console.log(`Influencer data for ID ${id} not found in table`)
    const sampleData:InfluencerStatistics = {
        id:id,
        averageInfluencerCount: 0,
        totalNoOfRecords:0
    }
    influencerStatisticsTable[id] = sampleData
    return sampleData;
  }
  async update(influencerStatistics:InfluencerStatistics):Promise<InfluencerStatistics>{
    console.log(`Updating influencer statistics for user with ID ${influencerStatistics.id}`)
    console.log(`current data`, influencerStatisticsTable[influencerStatistics.id])
    influencerStatisticsTable[influencerStatistics.id] = influencerStatistics;
    console.log(`updated data`, influencerStatisticsTable[influencerStatistics.id])
    return influencerStatistics;
  }
}
