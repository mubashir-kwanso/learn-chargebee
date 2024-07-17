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
    "\n  query GetSubscriptionPlans {\n    plans: getSubscriptionPlans {\n      id\n      name\n      external_name\n      description\n      prices {\n        id\n        name\n        external_name\n        price\n        currency_code\n        period\n        period_unit\n      }\n    }\n  }\n": types.GetSubscriptionPlansDocument,
    "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n": types.CreateCustomerDocument,
    "\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    paymentIntent: createPaymentIntent(input: $input) {\n      id\n      status\n      amount\n      currency_code\n      gateway\n      gateway_account_id\n      payment_method_type\n      customer_id\n      modified_at\n      created_at\n      updated_at\n    }\n  }\n": types.CreatePaymentIntentDocument,
    "\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n": types.CreateSubscriptionDocument,
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
export function gql(source: "\n  query GetSubscriptionPlans {\n    plans: getSubscriptionPlans {\n      id\n      name\n      external_name\n      description\n      prices {\n        id\n        name\n        external_name\n        price\n        currency_code\n        period\n        period_unit\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSubscriptionPlans {\n    plans: getSubscriptionPlans {\n      id\n      name\n      external_name\n      description\n      prices {\n        id\n        name\n        external_name\n        price\n        currency_code\n        period\n        period_unit\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n"): (typeof documents)["\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    paymentIntent: createPaymentIntent(input: $input) {\n      id\n      status\n      amount\n      currency_code\n      gateway\n      gateway_account_id\n      payment_method_type\n      customer_id\n      modified_at\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {\n    paymentIntent: createPaymentIntent(input: $input) {\n      id\n      status\n      amount\n      currency_code\n      gateway\n      gateway_account_id\n      payment_method_type\n      customer_id\n      modified_at\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscription($input: CreateSubscriptionInput!) {\n    subscription: createSubscription(input: $input) {\n      id\n      status\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;