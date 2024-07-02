import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChargeBee } from 'chargebee-typescript';
import {
  Customer,
  Estimate,
  Item,
  ItemPrice,
  Subscription,
} from 'chargebee-typescript/lib/resources';
import { StripeService } from 'src/stripe/stripe.service';
import {
  PaymentIntentResponse,
  PlanResponse,
  SubscriptionResponse,
} from './types';
import { CHARGEBEE_PROVIDER } from './constants';

@Injectable()
export class ChargebeeService {
  constructor(
    @Inject(CHARGEBEE_PROVIDER)
    private readonly chargebee: ChargeBee,
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService,
  ) {}

  async getPlansPrices(): Promise<PlanResponse[]> {
    const plansResult = (await this.chargebee.item
      .list({
        type: {
          is: 'plan',
        },
      })
      .request()) as {
      list: { item: Item }[];
    };
    const plans = plansResult.list.map((item) => item.item);

    const plansPricesResult = (await this.chargebee.item_price
      .list({
        item_id: {
          in: plans.map((plan) => plan.id),
        },
        item_type: {
          is: 'plan',
        },
      })
      .request()) as { list: { item_price: ItemPrice }[] };
    const plansPrices = plansPricesResult.list.map(
      (itemPrice) => itemPrice.item_price,
    );

    return plans.map((plan) => {
      const planPrices = plansPrices.filter(
        (price) => price.item_id === plan.id,
      );
      return {
        ...plan,
        prices: planPrices,
      };
    });
  }

  async createPaymentIntent({
    paymentMethodId,
    priceId,
    email,
  }: {
    paymentMethodId: string;
    priceId: string;
    email: string;
  }): Promise<PaymentIntentResponse> {
    // Create Stripe Customer
    const customer = await this.stripeService.createOrUpdateCustomer({
      email,
    });

    // Calculate amount from Chargebee Estimate API
    const { estimate } = (await this.chargebee.estimate
      .create_sub_item_estimate({
        subscription_items: [
          {
            item_price_id: priceId,
          },
        ],
      })
      .request()) as {
      estimate: Estimate;
    };

    if (!estimate.invoice_estimate) {
      throw new InternalServerErrorException('Failed to calculate estimate');
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await this.stripeService.createPaymentIntent({
      customer: customer.id,
      payment_method: paymentMethodId,
      currency: estimate.invoice_estimate.currency_code,
      amount: estimate.invoice_estimate.total ?? 0,
      confirmation_method: 'manual',
      capture_method: 'manual',
      setup_future_usage: 'off_session',
      confirm: true,
      return_url: 'http://localhost:3000',
    });

    if (!paymentIntent.client_secret) {
      throw new InternalServerErrorException('Failed to create payment intent');
    }

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      requires_action:
        paymentIntent.status === 'requires_action' &&
        paymentIntent.next_action?.type === 'use_stripe_sdk',
      status: paymentIntent.status,
    };
  }

  async createSubscription({
    email,
    priceId,
    paymentIntentId,
  }: {
    email: string;
    priceId: string;
    paymentIntentId: string;
  }): Promise<SubscriptionResponse> {
    const customer = await this.createOrUpdateCustomer({
      email,
    });
    const subscriptionResponse = (await this.chargebee.subscription
      .create_with_items(customer.id, {
        subscription_items: [
          {
            item_price_id: priceId,
          },
        ],
        payment_intent: {
          gw_token: paymentIntentId,
          gateway_account_id: this.configService.get(
            'STRIPE_GATWEWAY_ACCOUNT_ID',
          ),
        },
      })
      .request()) as {
      subscription: Subscription;
    };

    return {
      id: subscriptionResponse.subscription.id,
      status: subscriptionResponse.subscription.status,
    };
  }

  async createOrUpdateCustomer(params: { email: string }): Promise<Customer> {
    const customersResult = (await this.chargebee.customer
      .list({
        email: {
          is: params.email,
        },
        limit: 1,
      })
      .request()) as { list: { customer: Customer }[] };

    const customers = customersResult.list.map((customer) => customer.customer);

    if (customers.length > 0) {
      const customer = customers[0];
      const updatedCustomer = (await this.chargebee.customer
        .update(customer.id, params)
        .request()) as {
        customer: Customer;
      };
      return updatedCustomer.customer;
    }

    const newCustomer = (await this.chargebee.customer
      .create(params)
      .request()) as { customer: Customer };
    return newCustomer.customer;
  }
}
