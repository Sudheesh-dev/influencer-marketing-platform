import { Module } from '@nestjs/common';
import { InfluencersService } from './influencers.service';

@Module({
  providers: [InfluencersService]
})
export class InfluencersModule {}
