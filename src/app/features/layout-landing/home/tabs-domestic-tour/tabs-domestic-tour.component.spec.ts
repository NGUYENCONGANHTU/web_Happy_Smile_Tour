import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDomesticTourComponent } from './tabs-domestic-tour.component';

describe('TabsDomesticTourComponent', () => {
  let component: TabsDomesticTourComponent;
  let fixture: ComponentFixture<TabsDomesticTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsDomesticTourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDomesticTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
