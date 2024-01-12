import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomeNavbarComponent } from './login-home-navbar.component';

describe('LoginHomeNavbarComponent', () => {
  let component: LoginHomeNavbarComponent;
  let fixture: ComponentFixture<LoginHomeNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHomeNavbarComponent]
    });
    fixture = TestBed.createComponent(LoginHomeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
