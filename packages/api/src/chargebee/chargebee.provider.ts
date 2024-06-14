import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChargeBee } from 'chargebee-typescript';
import { CHARGEBEE_PROVIDER } from './constants';

export const ChargebeeProvider: FactoryProvider<ChargeBee> = {
  provide: CHARGEBEE_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const chargebee = new ChargeBee();
    chargebee.configure({
      site: configService.get('CHARGEBEE_SITE'),
      api_key: configService.get('CHARGEBEE_API_KEY'),
    });
    return chargebee;
  },
  inject: [ConfigService],
};
