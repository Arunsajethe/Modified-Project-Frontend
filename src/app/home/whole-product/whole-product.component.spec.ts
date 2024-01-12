import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeProductComponent } from './whole-product.component';

describe('WholeProductComponent', () => {
  let component: WholeProductComponent;
  let fixture: ComponentFixture<WholeProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WholeProductComponent]
    });
    fixture = TestBed.createComponent(WholeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
