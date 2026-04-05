import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { BillingModule } from './billing/billing.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatModule } from './chat/chat.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { SalaryModule } from './salary/salary.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PatientsModule,
    AdmissionsModule,
    BillingModule,
    ApprovalsModule,
    AppointmentsModule,
    NotificationsModule,
    ChatModule,
    WebsocketsModule,
    SalaryModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
