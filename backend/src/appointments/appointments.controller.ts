import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('appointments')
@UseGuards(AccessTokenGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.appointmentsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentsService.updateStatus(id, status);
  }
}
