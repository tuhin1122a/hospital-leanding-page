import { Controller, Get, Post, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('salary')
@UseGuards(AccessTokenGuard)
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get('staff')
  async getStaff(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.salaryService.getStaffSalaries();
  }

  @Post('pay')
  async paySalary(@Req() req: any, @Body() data: { userId: string; amount: number; month: number; year: number; note?: string }) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.salaryService.paySalary(data.userId, data.amount, data.month, data.year, data.note);
  }

  @Post('set-base')
  async setBase(@Req() req: any, @Body() data: { userId: string; amount: number }) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.salaryService.setBaseSalary(data.userId, data.amount);
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.salaryService.getAllSalaries();
  }

  @Get('my')
  async getMySalary(@Req() req: any) {
    return this.salaryService.getUserSalaries(req.user.sub);
  }
}
