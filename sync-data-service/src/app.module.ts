import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './modules/rmq/rmq.module';
import { InfluencersModule } from './modules/influencers/influencers.module';
import { MockstagramModule } from './modules/mockstagram/mockstagram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal:true
    }),
    RmqModule, 
    InfluencersModule, 
    MockstagramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
