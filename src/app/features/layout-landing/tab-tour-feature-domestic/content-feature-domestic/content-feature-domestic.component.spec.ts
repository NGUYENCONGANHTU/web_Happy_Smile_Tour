import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFeatureDomesticComponent } from './content-feature-domestic.component';

describe('ContentFeatureDomesticComponent', () => {
  let component: ContentFeatureDomesticComponent;
  let fixture: ComponentFixture<ContentFeatureDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentFeatureDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentFeatureDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
