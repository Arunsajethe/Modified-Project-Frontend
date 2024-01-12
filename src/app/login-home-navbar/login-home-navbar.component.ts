import { Component } from '@angular/core';
import { SessionStorageService } from '../service/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home-navbar',
  templateUrl: './login-home-navbar.component.html',
  styleUrls: ['./login-home-navbar.component.css']
})
export class LoginHomeNavbarComponent {

  constructor(private session:SessionStorageService, private router:Router)
  {

  }

  logout()
  {
    this.session.removeItem('login');
    this.router.navigateByUrl('home');

  }

}
