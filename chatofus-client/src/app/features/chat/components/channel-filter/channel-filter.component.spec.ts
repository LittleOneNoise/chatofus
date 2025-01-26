import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFilterComponent } from './channel-filter.component';

describe('ChannelFilterComponent', () => {
  let component: ChannelFilterComponent;
  let fixture: ComponentFixture<ChannelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
