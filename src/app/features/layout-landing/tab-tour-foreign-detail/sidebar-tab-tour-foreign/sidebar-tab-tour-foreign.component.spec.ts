import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTabTourForeignComponent } from './sidebar-tab-tour-foreign.component';

describe('SidebarTabTourForeignComponent', () => {
  let component: SidebarTabTourForeignComponent;
  let fixture: ComponentFixture<SidebarTabTourForeignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTabTourForeignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarTabTourForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
