import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFeatureForeignComponent } from './content-feature-foreign.component';

describe('ContentFeatureForeignComponent', () => {
  let component: ContentFeatureForeignComponent;
  let fixture: ComponentFixture<ContentFeatureForeignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentFeatureForeignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentFeatureForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
