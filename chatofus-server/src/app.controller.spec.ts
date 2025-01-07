import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });
});
