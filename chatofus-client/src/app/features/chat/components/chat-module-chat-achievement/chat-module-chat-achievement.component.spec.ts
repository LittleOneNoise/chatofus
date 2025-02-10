import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleChatAchievementComponent } from './chat-module-chat-achievement.component';

describe('ChatModuleChatAchievementComponent', () => {
  let component: ChatModuleChatAchievementComponent;
  let fixture: ComponentFixture<ChatModuleChatAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleChatAchievementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleChatAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
