import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTourTravelGuideDetailComponent } from './tab-tour-travel-guide-detail.component';

describe('TabTourTravelGuideDetailComponent', () => {
  let component: TabTourTravelGuideDetailComponent;
  let fixture: ComponentFixture<TabTourTravelGuideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTourTravelGuideDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTourTravelGuideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
