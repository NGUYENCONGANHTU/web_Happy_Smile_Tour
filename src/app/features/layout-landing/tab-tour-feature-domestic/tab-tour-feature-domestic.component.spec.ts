import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTourFeatureDomesticComponent } from './tab-tour-feature-domestic.component';

describe('TabTourFeatureDomesticComponent', () => {
  let component: TabTourFeatureDomesticComponent;
  let fixture: ComponentFixture<TabTourFeatureDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTourFeatureDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTourFeatureDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
