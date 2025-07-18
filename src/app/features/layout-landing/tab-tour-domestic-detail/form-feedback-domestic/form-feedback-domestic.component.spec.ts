import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFeedbackDomesticComponent } from './form-feedback-domestic.component';

describe('FormFeedbackDomesticComponent', () => {
  let component: FormFeedbackDomesticComponent;
  let fixture: ComponentFixture<FormFeedbackDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFeedbackDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFeedbackDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
