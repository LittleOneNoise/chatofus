import { TestBed } from '@angular/core/testing';

import { PlayerInfoService } from './player-info.service';

describe('PlayerInfoService', () => {
  let service: PlayerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
