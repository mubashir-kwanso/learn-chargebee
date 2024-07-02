import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChargebeeService } from './chargebee.service';
import {
  PaymentIntentResponse,
  PlanResponse,
  SubscriptionResponse,
} from './types';

@Controller('chargebee')
export class ChargebeeController {
  constructor(private readonly chargebeeService: ChargebeeService) {}

  @Get('plans')
  getPlansPrices(): Promise<PlanResponse[]> {
    return this.chargebeeService.getPlansPrices();
  }

  @Post('payment-intent')
  createPaymentIntent(
    @Body() body: { paymentMethodId: string; priceId: string; email: string },
  ): Promise<PaymentIntentResponse> {
    return this.chargebeeService.createPaymentIntent(body);
  }

  @Post('subscription')
  createSubscription(
    @Body() body: { paymentIntentId: string; priceId: string; email: string },
  ): Promise<SubscriptionResponse> {
    return this.chargebeeService.createSubscription(body);
  }
}
