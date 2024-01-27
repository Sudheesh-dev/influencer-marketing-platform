import { Module, forwardRef } from '@nestjs/common';
import { RMQHandler } from './rmq.handler';
import { InfluencerStatisticsRMQService } from './influencer-statistics-rmq.service';
import { ConfigModule } from '@nestjs/config';
import { InfluencerModule } from '../influencers/influencer.module';

@Module({
  imports:[
    ConfigModule,
    forwardRef(() => InfluencerModule)
  ],
  providers: [InfluencerStatisticsRMQService],
  controllers:[RMQHandler],
  exports:[InfluencerStatisticsRMQService]
})
export class RmqModule {}
