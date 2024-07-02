import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { STRIPE_PROVIDER } from './constants';

export const StripeProvider: FactoryProvider<Stripe> = {
  provide: STRIPE_PROVIDER,
  useFactory: (configService: ConfigService) => {
    return new Stripe(configService.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-06-20',
    });
  },
  inject: [ConfigService],
};
