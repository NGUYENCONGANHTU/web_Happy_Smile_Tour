import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTourDomesticComponent } from './sidebar-tour-domestic.component';

describe('SidebarTourDomesticComponent', () => {
  let component: SidebarTourDomesticComponent;
  let fixture: ComponentFixture<SidebarTourDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTourDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarTourDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
