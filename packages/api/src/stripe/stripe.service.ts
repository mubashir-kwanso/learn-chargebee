import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_PROVIDER } from './constants';

@Injectable()
export class StripeService {
  constructor(@Inject(STRIPE_PROVIDER) private readonly stripe: Stripe) {}

  /**
   * Create a new customer, or return an existing customer if one already exists with the same email.
   * @param params The customer creation parameters.
   * @returns The created or existing customer.
   */
  async createOrUpdateCustomer(
    params: Stripe.CustomerCreateParams,
  ): Promise<Stripe.Customer> {
    const customers = await this.stripe.customers.list({
      email: params.email,
      limit: 1,
    });
    if (customers.data.length > 0) {
      const customer = customers.data[0];
      return this.stripe.customers.update(customer.id, params);
    }
    return this.stripe.customers.create(params);
  }

  /**
   * Create a PaymentIntent for a subscription.
   * @param params The PaymentIntent creation parameters.
   * @returns The created PaymentIntent.
   */
  async createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create(params);
  }
}
