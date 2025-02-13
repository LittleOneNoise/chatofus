import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleAllianceComponent } from './chat-module-alliance.component';

describe('ChatModuleAllianceComponent', () => {
  let component: ChatModuleAllianceComponent;
  let fixture: ComponentFixture<ChatModuleAllianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleAllianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleAllianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
