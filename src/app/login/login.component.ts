import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionStorageService } from '../service/session-storage.service';
import Swal from 'sweetalert2';
import { HomeService } from '../service/home.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string=''
  password:string=''
  login:any

  constructor(private router:Router, private session:SessionStorageService, private service:HomeService)
  {
    
  }


  onSubmit()
  {
    const temp = this.service.checkLogin(this.email,this.password).subscribe((e)=> this.login=e);

    setTimeout(() => {
      if (this.login == true)
      {
        console.log("success")

        Swal.fire({
          icon:'success',
          title:"Welocme User"
        })

        this.session.setItem("login",this.email);
        this.session.setItem('form1',true)
        this.session.setItem('form2',false)
        this.router.navigateByUrl("/homepage");
      }
      else
      {
        Swal.fire({
          icon:'error',
          title:"Email / Password is invalid"
        })
      }
    }, 200);

    
    
  }

}
