import { Test, TestingModule } from '@nestjs/testing';
import { SubareaInfoController } from './subarea-info.controller';
import { SubareaInfoService } from './subarea-info.service';

describe('SubareaInfoController', () => {
  let controller: SubareaInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubareaInfoController],
      providers: [SubareaInfoService],
    }).compile();

    controller = module.get<SubareaInfoController>(SubareaInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
