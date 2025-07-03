import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourFeatureForeignComponent } from './tour-feature-foreign.component';

describe('TourFeatureForeignComponent', () => {
  let component: TourFeatureForeignComponent;
  let fixture: ComponentFixture<TourFeatureForeignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourFeatureForeignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourFeatureForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
