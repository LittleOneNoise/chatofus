import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalsComponent } from './portals.component';

describe('PortalsComponent', () => {
  let component: PortalsComponent;
  let fixture: ComponentFixture<PortalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
