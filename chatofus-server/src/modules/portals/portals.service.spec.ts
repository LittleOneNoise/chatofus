import { Test, TestingModule } from '@nestjs/testing';
import { PortalsService } from './portals.service';

describe('PortalsService', () => {
  let service: PortalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortalsService],
    }).compile();

    service = module.get<PortalsService>(PortalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
