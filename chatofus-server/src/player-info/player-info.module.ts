import { Module } from '@nestjs/common';
import { PlayerInfoService } from './player-info.service';
import {PlayerInfoController} from "./player-info.controller";
import {HttpModule} from "@nestjs/axios";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 24 * 60 * 60, // 24 heures en secondes
      max: 10000, // nombre maximum d'entrées en cache
      isGlobal: true
    })
  ],
  controllers: [PlayerInfoController],
  providers: [PlayerInfoService],
  exports: [PlayerInfoService]
})
export class PlayerInfoModule {}
