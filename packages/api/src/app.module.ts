import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChargebeeModule } from './chargebee/chargebee.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChargebeeModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
