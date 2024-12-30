import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { LoggerService } from './logger/logger.service';
import { PlayerInfoController } from './player-info/player-info.controller';
import { PlayerInfoModule } from './player-info/player-info.module';

@Module({
  imports: [ChatModule, PlayerInfoModule],
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