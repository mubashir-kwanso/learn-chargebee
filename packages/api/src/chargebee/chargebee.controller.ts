import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Event, PaymentIntent } from 'chargebee-typescript/lib/resources';
import { ChargebeeService } from './chargebee.service';
import { PlanResponse, SubscriptionResponse } from './types';

@Controller('chargebee')
export class ChargebeeController {
  constructor(
    private readonly configService: ConfigService,
    private readonly chargebeeService: ChargebeeService,
  ) {}

  @Get('plans')
  getPlansPrices(): Promise<PlanResponse[]> {
    return this.chargebeeService.getPlansPrices();
  }

  @Post('payment-intent')
  createPaymentIntent(
    @Body() body: { email: string; priceId: string },
  ): Promise<PaymentIntent> {
    return this.chargebeeService.createPaymentIntent(body);
  }

  @Post('subscription')
  createSubscription(
    @Body() body: { paymentIntentId: string; priceId: string; email: string },
  ): Promise<SubscriptionResponse> {
    return this.chargebeeService.createSubscription(body);
  }

  @Post('webhook')
  handleWebhook(
    @Headers('Authorization') authorization: string,
    @Body() event: Event,
  ): Promise<{
    status: 'success';
    message: string;
  }> {
    if (
      authorization !==
      'Basic ' + this.configService.get('CHARGEBEE_WEBHOOK_BASIC_AUTH')
    ) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.chargebeeService.handleWebhook(event);
  }
}
