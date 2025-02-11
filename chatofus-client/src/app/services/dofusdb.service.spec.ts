import { TestBed } from '@angular/core/testing';

import { DofusdbService } from './dofusdb.service';

describe('DofusdbService', () => {
  let service: DofusdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DofusdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
