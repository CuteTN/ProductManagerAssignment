import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditorPageComponent } from './product-editor-page.component';

describe('ProductEditorPageComponent', () => {
  let component: ProductEditorPageComponent;
  let fixture: ComponentFixture<ProductEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
