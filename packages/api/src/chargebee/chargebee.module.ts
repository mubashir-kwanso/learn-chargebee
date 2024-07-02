import { Module } from '@nestjs/common';
import { StripeModule } from 'src/stripe/stripe.module';
import { ChargebeeService } from './chargebee.service';
import { ChargebeeController } from './chargebee.controller';
import { ChargebeeProvider } from './chargebee.provider';

@Module({
  imports: [StripeModule],
  controllers: [ChargebeeController],
  providers: [ChargebeeProvider, ChargebeeService],
})
export class ChargebeeModule {}
