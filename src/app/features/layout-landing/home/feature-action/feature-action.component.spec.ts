import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureActionComponent } from './feature-action.component';

describe('FeatureActionComponent', () => {
  let component: FeatureActionComponent;
  let fixture: ComponentFixture<FeatureActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
