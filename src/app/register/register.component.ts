import { Component } from '@angular/core';
import { Register } from './pojo/register';
import Swal from 'sweetalert2';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register:Register;
  checkEmail:any

  constructor(private service:HomeService,private router:Router)
  {
    this.register = new Register('','','','','','');
  }

  genderList=['Male','Female'];

  datasubmit()
  {

    this.service.checkEmail(this.register.email).subscribe( e => this.checkEmail =e);

    setTimeout(() => {

      if (this.checkEmail == false)
      {
        this.service.addRegister(this.register).subscribe();
        Swal.fire({
          icon:'success',
          title:"Registration Succesfull"
        })

        this.router.navigateByUrl("/login")
      }
      else
      {
        Swal.fire({
          icon:'error',
          title:"Email already exist"
        })
      }
      
    }, 1000);
    
  }

}
