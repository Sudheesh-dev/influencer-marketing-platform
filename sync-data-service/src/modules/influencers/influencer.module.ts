import { Module, forwardRef } from '@nestjs/common';
import { InfluencersService } from './influencer.service';
import { RmqModule } from '../rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { InfluencerRepository } from './influencer.repository';

@Module({
  imports:[
    ConfigModule,
    forwardRef(() => RmqModule)
  ],
  providers: [
    InfluencersService,
    InfluencerRepository
  ],
  exports: [
    InfluencersService,
    InfluencerRepository
  ]
})
export class InfluencerModule {}
