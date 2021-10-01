import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterFormComponent } from './products-filter-form.component';

describe('ProductsFilterFormComponent', () => {
  let component: ProductsFilterFormComponent;
  let fixture: ComponentFixture<ProductsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
