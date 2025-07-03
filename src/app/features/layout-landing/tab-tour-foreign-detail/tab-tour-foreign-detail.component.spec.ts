import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTourForeignDetailComponent } from './tab-tour-foreign-detail.component';

describe('TabTourForeignDetailComponent', () => {
  let component: TabTourForeignDetailComponent;
  let fixture: ComponentFixture<TabTourForeignDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTourForeignDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTourForeignDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
