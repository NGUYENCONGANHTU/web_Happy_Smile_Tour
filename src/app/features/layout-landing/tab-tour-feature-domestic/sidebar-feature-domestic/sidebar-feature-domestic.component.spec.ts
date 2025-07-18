import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFeatureDomesticComponent } from './sidebar-feature-domestic.component';

describe('SidebarFeatureDomesticComponent', () => {
  let component: SidebarFeatureDomesticComponent;
  let fixture: ComponentFixture<SidebarFeatureDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFeatureDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFeatureDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
