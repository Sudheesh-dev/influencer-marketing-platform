import { Module } from '@nestjs/common';
import { MockstagramService } from './mockstagram.service';

@Module({
  providers: [MockstagramService]
})
export class MockstagramModule {}
