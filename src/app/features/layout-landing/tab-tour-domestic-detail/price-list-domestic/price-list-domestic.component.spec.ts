import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListDomesticComponent } from './price-list-domestic.component';

describe('PriceListDomesticComponent', () => {
  let component: PriceListDomesticComponent;
  let fixture: ComponentFixture<PriceListDomesticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceListDomesticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceListDomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
