import { Module } from '@nestjs/common';
import { PortalsService } from './portals.service';
import { PortalsController } from './portals.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [PortalsController],
  providers: [PortalsService, PrismaService],
})
export class PortalsModule {}
