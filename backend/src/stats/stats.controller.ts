import { Controller, Get, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('stats')
@UseGuards(AccessTokenGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  async getOverview(@Req() req: any) {
    // Only Admin or certain roles can see the overview summary
    if (req.user.role !== 'ADMIN' && req.user.role !== 'STAFF') {
      throw new ForbiddenException('Access to overview stats is restricted');
    }
    return this.statsService.getDashboardOverview();
  }
}
