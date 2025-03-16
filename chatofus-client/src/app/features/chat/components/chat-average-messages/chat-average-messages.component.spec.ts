import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAverageMessagesComponent } from './chat-average-messages.component';

describe('ChatAverageMessagesComponent', () => {
  let component: ChatAverageMessagesComponent;
  let fixture: ComponentFixture<ChatAverageMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAverageMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAverageMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
