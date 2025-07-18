import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePlaceDomesticComponent } from './feature-place-domestic.component';

describe('FeaturePlaceDomesticComponent', () => {
  let component: FeaturePlaceDomesticComponent;
  let fixture: ComponentFixture<FeaturePlaceDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePlaceDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePlaceDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
