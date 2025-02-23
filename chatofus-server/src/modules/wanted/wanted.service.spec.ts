import { Test, TestingModule } from '@nestjs/testing';
import { WantedService } from './wanted.service';

describe('WantedService', () => {
  let service: WantedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WantedService],
    }).compile();

    service = module.get<WantedService>(WantedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
