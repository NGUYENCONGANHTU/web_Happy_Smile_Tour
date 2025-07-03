import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourFeatureDomesticComponent } from './tour-feature-domestic.component';

describe('TourFeatureDomesticComponent', () => {
  let component: TourFeatureDomesticComponent;
  let fixture: ComponentFixture<TourFeatureDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourFeatureDomesticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourFeatureDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
