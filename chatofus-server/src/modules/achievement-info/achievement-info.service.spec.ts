import { Test, TestingModule } from '@nestjs/testing';
import { AchievementInfoService } from './achievement-info.service';

describe('AchievementInfoService', () => {
  let service: AchievementInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchievementInfoService],
    }).compile();

    service = module.get<AchievementInfoService>(AchievementInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
