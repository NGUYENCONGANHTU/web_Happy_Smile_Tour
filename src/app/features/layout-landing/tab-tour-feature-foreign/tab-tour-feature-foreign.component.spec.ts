import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTourFeatureForeignComponent } from './tab-tour-feature-foreign.component';

describe('TabTourFeatureForeignComponent', () => {
  let component: TabTourFeatureForeignComponent;
  let fixture: ComponentFixture<TabTourFeatureForeignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTourFeatureForeignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTourFeatureForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
