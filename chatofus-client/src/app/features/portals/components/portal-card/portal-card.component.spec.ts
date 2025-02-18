import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalCardComponent } from './portal-card.component';

describe('PortalCardComponent', () => {
  let component: PortalCardComponent;
  let fixture: ComponentFixture<PortalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
