import { Test, TestingModule } from '@nestjs/testing';
import { WantedController } from './wanted.controller';
import { WantedService } from './wanted.service';

describe('WantedController', () => {
  let controller: WantedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WantedController],
      providers: [WantedService],
    }).compile();

    controller = module.get<WantedController>(WantedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
