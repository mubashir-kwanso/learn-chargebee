import { Inject, Injectable } from '@nestjs/common';
import { ChargeBee } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { CHARGEBEE_PROVIDER } from './constants';

@Injectable()
export class ChargebeeService {
  constructor(
    @Inject(CHARGEBEE_PROVIDER)
    private readonly chargebee: ChargeBee,
  ) {}

  async getPlansPrices() {
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
}
