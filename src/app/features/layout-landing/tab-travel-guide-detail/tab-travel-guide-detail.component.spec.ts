import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTravelGuideDetailComponent } from './tab-travel-guide-detail.component';

describe('TabTravelGuideDetailComponent', () => {
  let component: TabTravelGuideDetailComponent;
  let fixture: ComponentFixture<TabTravelGuideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTravelGuideDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTravelGuideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
