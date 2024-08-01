/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n": types.CreateCustomerDocument,
    "\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    createPaymentIntent(input: $input) {\n      paymentIntent {\n        id\n        status\n        currency_code\n        amount\n        gateway_account_id\n        expires_at\n        payment_method_type\n        success_url\n        failure_url\n        created_at\n        modified_at\n        resource_version\n        updated_at\n        customer_id\n        gateway\n        object\n      }\n      price {\n        id\n        name\n        description\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        metadata\n        object\n      }\n    }\n  }\n": types.CreatePaymentIntentDocument,
    "\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n": types.CreateSubscriptionDocument,
    "\n  mutation CreatePaymentSource($input: CreatePaymentSourceInput!) {\n    createPaymentSource(input: $input) {\n      id\n      created_at\n      card {\n        first_name\n        last_name\n        iin\n        last4\n        brand\n        expiry_month\n        expiry_year\n      }\n    }\n  }\n": types.CreatePaymentSourceDocument,
    "\n  query GetSubscriptionPlans($input: GetSubscriptionPlansInput!) {\n    plans: getSubscriptionPlans(input: $input) {\n      id\n      name\n      external_name\n      description\n      status\n      item_family_id\n      type\n      unit\n      metered\n      usage_calculation\n      metadata\n      object\n      prices {\n        id\n        name\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        object\n        metadata\n        description\n      }\n    }\n  }\n": types.GetSubscriptionPlansDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n"): (typeof documents)["\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    createPaymentIntent(input: $input) {\n      paymentIntent {\n        id\n        status\n        currency_code\n        amount\n        gateway_account_id\n        expires_at\n        payment_method_type\n        success_url\n        failure_url\n        created_at\n        modified_at\n        resource_version\n        updated_at\n        customer_id\n        gateway\n        object\n      }\n      price {\n        id\n        name\n        description\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        metadata\n        object\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    createPaymentIntent(input: $input) {\n      paymentIntent {\n        id\n        status\n        currency_code\n        amount\n        gateway_account_id\n        expires_at\n        payment_method_type\n        success_url\n        failure_url\n        created_at\n        modified_at\n        resource_version\n        updated_at\n        customer_id\n        gateway\n        object\n      }\n      price {\n        id\n        name\n        description\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        metadata\n        object\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePaymentSource($input: CreatePaymentSourceInput!) {\n    createPaymentSource(input: $input) {\n      id\n      created_at\n      card {\n        first_name\n        last_name\n        iin\n        last4\n        brand\n        expiry_month\n        expiry_year\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePaymentSource($input: CreatePaymentSourceInput!) {\n    createPaymentSource(input: $input) {\n      id\n      created_at\n      card {\n        first_name\n        last_name\n        iin\n        last4\n        brand\n        expiry_month\n        expiry_year\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSubscriptionPlans($input: GetSubscriptionPlansInput!) {\n    plans: getSubscriptionPlans(input: $input) {\n      id\n      name\n      external_name\n      description\n      status\n      item_family_id\n      type\n      unit\n      metered\n      usage_calculation\n      metadata\n      object\n      prices {\n        id\n        name\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        object\n        metadata\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSubscriptionPlans($input: GetSubscriptionPlansInput!) {\n    plans: getSubscriptionPlans(input: $input) {\n      id\n      name\n      external_name\n      description\n      status\n      item_family_id\n      type\n      unit\n      metered\n      usage_calculation\n      metadata\n      object\n      prices {\n        id\n        name\n        currency_code\n        pricing_model\n        free_quantity\n        item_family_id\n        item_id\n        status\n        external_name\n        price\n        period\n        period_unit\n        is_taxable\n        item_type\n        object\n        metadata\n        description\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;