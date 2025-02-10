import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleMonsterGroupComponent } from './chat-module-monster-group.component';

describe('ChatModuleMonsterGroupComponent', () => {
  let component: ChatModuleMonsterGroupComponent;
  let fixture: ComponentFixture<ChatModuleMonsterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleMonsterGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleMonsterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
