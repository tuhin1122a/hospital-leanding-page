import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('approvals')
@UseGuards(AccessTokenGuard)
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.approvalsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.approvalsService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.approvalsService.updateStatus(id, status);
  }
}
