import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { LoggerService } from './common/logger/logger.service';
import { PlayerInfoController } from './modules/player-info/player-info.controller';
import { PlayerInfoModule } from './modules/player-info/player-info.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AchievementInfoController } from './modules/achievement-info/achievement-info.controller';
import { AchievementInfoModule } from './modules/achievement-info/achievement-info.module';
import { SubareaInfoModule } from './modules/subarea-info/subarea-info.module';
import { SubareaInfoController } from './modules/subarea-info/subarea-info.controller';

@Module({
  imports: [
    ChatModule,
    PlayerInfoModule,
    AchievementInfoModule,
    SubareaInfoModule,
    CacheModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    PlayerInfoController,
    AchievementInfoController,
    SubareaInfoController,
  ],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerService)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
