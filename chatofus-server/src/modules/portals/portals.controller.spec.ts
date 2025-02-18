import { Test, TestingModule } from '@nestjs/testing';
import { PortalsController } from './portals.controller';
import { PortalsService } from './portals.service';

describe('PortalsController', () => {
  let controller: PortalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalsController],
      providers: [PortalsService],
    }).compile();

    controller = module.get<PortalsController>(PortalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
