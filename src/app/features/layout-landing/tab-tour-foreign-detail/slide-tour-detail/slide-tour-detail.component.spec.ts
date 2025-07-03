import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTourDetailComponent } from './slide-tour-detail.component';

describe('SlideTourDetailComponent', () => {
  let component: SlideTourDetailComponent;
  let fixture: ComponentFixture<SlideTourDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideTourDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
