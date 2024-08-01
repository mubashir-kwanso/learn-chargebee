import { gql } from "../__generated__";

export const GET_SUBSCRIPTION_PLANS = gql(/* GraphQL */ `
  query GetSubscriptionPlans($input: GetSubscriptionPlansInput!) {
    plans: getSubscriptionPlans(input: $input) {
      id
      name
      external_name
      description
      status
      item_family_id
      type
      unit
      metered
      usage_calculation
      metadata
      object
      prices {
        id
        name
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
        object
        metadata
        description
      }
    }
  }
`);
