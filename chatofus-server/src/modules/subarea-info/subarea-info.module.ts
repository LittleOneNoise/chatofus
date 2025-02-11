import { Module } from '@nestjs/common';
import { SubareaInfoService } from './subarea-info.service';
import { SubareaInfoController } from './subarea-info.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 24 * 60 * 60, // 24 heures en secondes
      max: 10000, // nombre maximum d'entrées en cache
      isGlobal: true,
    }),
  ],
  controllers: [SubareaInfoController],
  providers: [SubareaInfoService],
  exports: [SubareaInfoService],
})
export class SubareaInfoModule {}
