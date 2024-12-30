import { Test, TestingModule } from '@nestjs/testing';
import { PlayerInfoService } from './player-info.service';

describe('PlayerInfoService', () => {
  let service: PlayerInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerInfoService],
    }).compile();

    service = module.get<PlayerInfoService>(PlayerInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
