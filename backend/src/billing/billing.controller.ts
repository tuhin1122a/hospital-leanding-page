import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('billing')
@UseGuards(AccessTokenGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() createBillingDto: any) {
    return this.billingService.create(createBillingDto);
  }

  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingDto: any) {
    return this.billingService.update(id, updateBillingDto);
  }
}
