import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBundleComponent } from './create-bundle.component';

describe('CreateBundleComponent', () => {
  let component: CreateBundleComponent;
  let fixture: ComponentFixture<CreateBundleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBundleComponent]
    });
    fixture = TestBed.createComponent(CreateBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
