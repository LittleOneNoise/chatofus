import { TestBed } from '@angular/core/testing';

import { AchievementInfoService } from './achievement-info.service';

describe('AchievementInfoService', () => {
  let service: AchievementInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
