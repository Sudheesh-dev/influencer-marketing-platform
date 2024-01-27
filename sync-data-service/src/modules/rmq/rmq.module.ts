import { Module } from '@nestjs/common';
import { RMQHandler } from './rmq.handler';
import { InfluencerStatisticsRMQService } from './influencer-statistics-rmq.service';

@Module({
  providers: [InfluencerStatisticsRMQService],
  controllers:[RMQHandler],
  exports:[InfluencerStatisticsRMQService]
})
export class RmqModule {}
