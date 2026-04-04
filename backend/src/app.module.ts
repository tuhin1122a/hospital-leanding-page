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

@Module({
  imports: [AuthModule, UsersModule, PatientsModule, AdmissionsModule, BillingModule, ApprovalsModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
