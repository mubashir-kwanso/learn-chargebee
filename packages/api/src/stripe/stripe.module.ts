import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeProvider } from './stripe.provider';

@Module({
  providers: [StripeProvider, StripeService],
  exports: [StripeService],
})
export class StripeModule {}
