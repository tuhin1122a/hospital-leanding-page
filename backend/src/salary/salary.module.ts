import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SalaryService, PrismaService],
  controllers: [SalaryController],
  exports: [SalaryService],
})
export class SalaryModule {}
