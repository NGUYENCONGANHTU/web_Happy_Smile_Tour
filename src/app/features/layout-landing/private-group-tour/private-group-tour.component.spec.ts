import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGroupTourComponent } from './private-group-tour.component';

describe('PrivateGroupTourComponent', () => {
  let component: PrivateGroupTourComponent;
  let fixture: ComponentFixture<PrivateGroupTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateGroupTourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateGroupTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
