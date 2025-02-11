import { Test, TestingModule } from '@nestjs/testing';
import { SubareaInfoService } from './subarea-info.service';

describe('SubareaInfoService', () => {
  let service: SubareaInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubareaInfoService],
    }).compile();

    service = module.get<SubareaInfoService>(SubareaInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
