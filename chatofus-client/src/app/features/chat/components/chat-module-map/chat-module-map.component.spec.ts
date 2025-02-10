import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModuleMapComponent } from './chat-module-map.component';

describe('ChatModuleMapComponent', () => {
  let component: ChatModuleMapComponent;
  let fixture: ComponentFixture<ChatModuleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModuleMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModuleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
