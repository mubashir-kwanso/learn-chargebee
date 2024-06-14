import { Controller, Get } from '@nestjs/common';
import { ChargebeeService } from './chargebee.service';

@Controller('chargebee')
export class ChargebeeController {
  constructor(private readonly chargebeeService: ChargebeeService) {}

  @Get('plans')
  async getPlansPrices() {
    return this.chargebeeService.getPlansPrices();
  }
}
