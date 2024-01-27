import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './modules/rmq/rmq.module';
import { InfluencerModule } from './modules/influencers/influencer.module';
import { MockstagramModule } from './modules/mockstagram/mockstagram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal:true
    }),
    RmqModule, 
    InfluencerModule, 
    MockstagramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
