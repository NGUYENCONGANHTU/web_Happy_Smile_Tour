import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTourDomesticDetailComponent } from './slide-tour-domestic-detail.component';

describe('SlideTourDomesticDetailComponent', () => {
  let component: SlideTourDomesticDetailComponent;
  let fixture: ComponentFixture<SlideTourDomesticDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideTourDomesticDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideTourDomesticDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
