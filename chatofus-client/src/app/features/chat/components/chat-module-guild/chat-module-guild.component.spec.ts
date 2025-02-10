import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleGuildComponent } from './chat-module-guild.component';

describe('ChatModuleGuildComponent', () => {
  let component: ChatModuleGuildComponent;
  let fixture: ComponentFixture<ChatModuleGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleGuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
