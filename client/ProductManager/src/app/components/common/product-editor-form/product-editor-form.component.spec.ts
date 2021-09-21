import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditorFormComponent } from './product-editor-form.component';

describe('ProductEditorFormComponent', () => {
  let component: ProductEditorFormComponent;
  let fixture: ComponentFixture<ProductEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
