import { Module, forwardRef } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { RmqModule } from '../rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { InfluencerRepository } from './influencer.repository';
import { MockstagramModule } from '../mockstagram/mockstagram.module';

@Module({
  imports:[
    ConfigModule,
    forwardRef(() => RmqModule),
    MockstagramModule
  ],
  providers: [
    InfluencerService,
    InfluencerRepository
  ],
  exports: [
    InfluencerService,
    InfluencerRepository
  ]
})
export class InfluencerModule {}
