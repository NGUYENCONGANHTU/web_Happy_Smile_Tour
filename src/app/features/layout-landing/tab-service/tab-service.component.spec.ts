import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServiceComponent } from './tab-service.component';

describe('TabServiceComponent', () => {
  let component: TabServiceComponent;
  let fixture: ComponentFixture<TabServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
