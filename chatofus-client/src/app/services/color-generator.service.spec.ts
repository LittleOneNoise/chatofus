import { TestBed } from '@angular/core/testing';

import { ColorGeneratorService } from './color-generator.service';

describe('ColorGeneratorService', () => {
  let service: ColorGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
