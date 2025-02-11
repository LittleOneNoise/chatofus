import { Test, TestingModule } from '@nestjs/testing';
import { AchievementInfoController } from './achievement-info.controller';
import { AchievementInfoService } from './achievement-info.service';

describe('AchievementInfoController', () => {
  let controller: AchievementInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementInfoController],
      providers: [AchievementInfoService],
    }).compile();

    controller = module.get<AchievementInfoController>(
      AchievementInfoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
