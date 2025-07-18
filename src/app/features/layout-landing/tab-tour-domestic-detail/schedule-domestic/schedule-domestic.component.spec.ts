import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDomesticComponent } from './schedule-domestic.component';

describe('ScheduleDomesticComponent', () => {
  let component: ScheduleDomesticComponent;
  let fixture: ComponentFixture<ScheduleDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
