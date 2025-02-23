import { Module } from '@nestjs/common';
import { WantedService } from './wanted.service';
import { WantedController } from './wanted.controller';

@Module({
  controllers: [WantedController],
  providers: [WantedService],
})
export class WantedModule {}
