import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePlaceComponent } from './feature-place.component';

describe('FeaturePlaceComponent', () => {
  let component: FeaturePlaceComponent;
  let fixture: ComponentFixture<FeaturePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
