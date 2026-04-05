import { Module } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';
import { PrismaService } from '../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ApprovalsController],
  providers: [ApprovalsService, PrismaService],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}
