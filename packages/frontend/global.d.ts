import { Chargebee } from "@chargebee/chargebee-js-types";

export {};

declare global {
  interface Window {
    Chargebee: Chargebee;
  }
}
