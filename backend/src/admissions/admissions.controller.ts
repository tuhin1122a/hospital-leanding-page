import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('admissions')
@UseGuards(AccessTokenGuard)
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  create(@Body() createAdmissionDto: any) {
    return this.admissionsService.create(createAdmissionDto);
  }

  @Get()
  findAll() {
    return this.admissionsService.findAll();
  }

  @Patch(':id/discharge')
  discharge(@Param('id') id: string) {
    return this.admissionsService.discharge(id);
  }
}
