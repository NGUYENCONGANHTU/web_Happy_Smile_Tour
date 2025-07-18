import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTourDomesticDetailComponent } from './tab-tour-domestic-detail.component';

describe('TabTourDomesticDetailComponent', () => {
  let component: TabTourDomesticDetailComponent;
  let fixture: ComponentFixture<TabTourDomesticDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTourDomesticDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTourDomesticDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
