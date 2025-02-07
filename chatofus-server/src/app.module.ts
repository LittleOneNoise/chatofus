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

@Module({
  imports: [
    ChatModule,
    PlayerInfoModule,
    CacheModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, PlayerInfoController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerService)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
