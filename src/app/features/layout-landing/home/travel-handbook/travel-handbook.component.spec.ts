import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelHandbookComponent } from './travel-handbook.component';

describe('TravelHandbookComponent', () => {
  let component: TravelHandbookComponent;
  let fixture: ComponentFixture<TravelHandbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelHandbookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelHandbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
