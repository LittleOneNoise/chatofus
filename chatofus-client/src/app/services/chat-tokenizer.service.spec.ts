import { TestBed } from '@angular/core/testing';

import { ChatTokenizerService } from './chat-tokenizer.service';

describe('ChatTokenizerService', () => {
  let service: ChatTokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatTokenizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
