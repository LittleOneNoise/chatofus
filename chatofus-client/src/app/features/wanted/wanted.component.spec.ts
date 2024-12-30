import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantedComponent } from './wanted.component';

describe('WantedComponent', () => {
  let component: WantedComponent;
  let fixture: ComponentFixture<WantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WantedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
