import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsForeignTourComponent } from './tabs-foreign-tour.component';

describe('TabsForeignTourComponent', () => {
  let component: TabsForeignTourComponent;
  let fixture: ComponentFixture<TabsForeignTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsForeignTourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsForeignTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
