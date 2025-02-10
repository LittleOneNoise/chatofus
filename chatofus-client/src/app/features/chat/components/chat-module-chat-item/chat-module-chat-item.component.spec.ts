import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleChatItemComponent } from './chat-module-chat-item.component';

describe('ChatModuleChatItemComponent', () => {
  let component: ChatModuleChatItemComponent;
  let fixture: ComponentFixture<ChatModuleChatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleChatItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleChatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
