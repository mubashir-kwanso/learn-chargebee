import { Module } from '@nestjs/common';
import { ChargebeeService } from './chargebee.service';
import { ChargebeeController } from './chargebee.controller';
import { ChargebeeProvider } from './chargebee.provider';

@Module({
  controllers: [ChargebeeController],
  providers: [ChargebeeProvider, ChargebeeService],
})
export class ChargebeeModule {}
