import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('invoices')
  findAll() {
    return this.billingService.findAllInvoices();
  }

  @Post('invoices/:id/pay')
  markAsPaid(@Param('id') id: string, @Body('method') method: string) {
    return this.billingService.markAsPaid(+id, method);
  }
}
