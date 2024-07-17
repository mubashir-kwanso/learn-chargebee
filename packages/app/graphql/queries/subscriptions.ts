import { gql } from "../__generated__";

export const GET_SUBSCRIPTION_PLANS = gql(/* GraphQL */ `
  query GetSubscriptionPlans {
    plans: getSubscriptionPlans {
      id
      name
      external_name
      description
      prices {
        id
        name
        external_name
        price
        currency_code
        period
        period_unit
      }
    }
  }
`);

export const CREATE_CUSTOMER = gql(/* GraphQL */ `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input)
  }
`);

export const CREATE_PAYMENT_INTENT = gql(/* GraphQL */ `
  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {
    paymentIntent: createPaymentIntent(input: $input) {
      id
      status
      amount
      currency_code
      gateway
      gateway_account_id
      payment_method_type
      customer_id
      modified_at
      created_at
      updated_at
    }
  }
`);

export const CREATE_SUBSCRIPTION = gql(/* GraphQL */ `
  mutation CreateSubscription($input: CreateSubscriptionInput!) {
    subscription: createSubscription(input: $input) {
      id
      status
    }
  }
`);
