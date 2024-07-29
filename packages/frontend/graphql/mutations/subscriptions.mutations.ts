import { gql } from "../__generated__";

export const CREATE_CUSTOMER = gql(/* GraphQL */ `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input)
  }
`);

export const CREATE_PAYMENT_INTENT = gql(/* GraphQL */ `
  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {
    createPaymentIntent(input: $input) {
      paymentIntent {
        id
        status
        currency_code
        amount
        gateway_account_id
        expires_at
        payment_method_type
        success_url
        failure_url
        created_at
        modified_at
        resource_version
        updated_at
        customer_id
        gateway
        object
      }
      price {
        id
        name
        description
        currency_code
        pricing_model
        free_quantity
        item_family_id
        item_id
        status
        external_name
        price
        period
        period_unit
        is_taxable
        item_type
        metadata
        object
      }
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
