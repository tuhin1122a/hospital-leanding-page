import { Module, Global } from '@nestjs/common';
import { AppGateway } from '../gateways/app.gateway';
import { PrismaService } from '../prisma.service';

@Global()
@Module({
  providers: [AppGateway, PrismaService],
  exports: [AppGateway],
})
export class WebsocketsModule {}
