import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleSubAreaComponent } from './chat-module-sub-area.component';

describe('ChatModuleSubAreaComponent', () => {
  let component: ChatModuleSubAreaComponent;
  let fixture: ComponentFixture<ChatModuleSubAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleSubAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
