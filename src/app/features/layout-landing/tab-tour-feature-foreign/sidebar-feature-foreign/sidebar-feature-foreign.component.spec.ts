import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFeatureForeignComponent } from './sidebar-feature-foreign.component';

describe('SidebarFeatureForeignComponent', () => {
  let component: SidebarFeatureForeignComponent;
  let fixture: ComponentFixture<SidebarFeatureForeignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFeatureForeignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFeatureForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
