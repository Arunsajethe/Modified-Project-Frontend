import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import Swal from 'sweetalert2';
import { Bundle } from '../pojo/bundle';

@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.css']
})
export class CreateBundleComponent {

  products:any
  bundle:Bundle
  bundleIdEntered = false;
  idexist:any
  myproduct:any=[]
  categoryList = ['Wireline','Wireless','Both wireless and wireline', 'Other']

  constructor(private service: HomeService, private session: SessionStorageService)
  {
    this.service.viewProduct().subscribe(e => this.products =e)
    this.bundle = new Bundle('','','','',[])
  }

  check(form:string):boolean
  {
    return this.session.getItem(form)
  }

  submitForm1()
  {
    this.session.setItem('form1',false)
    this.session.setItem('form2',true)
  }

  previousForm()
  {
    this.session.setItem('form1',true)
    this.session.setItem('form2',false)
  }

  submit()
  {
    for (let my of this.myproduct)
    {
      this.bundle.product_id.push(my.pid)
    }
    console.log("FInal array");
    console.log(this.bundle);
    
    this.service.addBundle(this.bundle).subscribe();

    Swal.fire({
      icon: 'success',
      title: 'Bundle created'
    }) 
    
  }

  addingProduct(prod:any)
  {
    if(this.myproduct.includes(prod))
    {
      this.myproduct = this.myproduct.filter((i:any) => i !==prod)
    }
    else
    {
      this.myproduct.push(prod);
    }    
  }

  checkBundle() 
  {
    this.service.checkId(this.bundle.bundle_id).subscribe( e => this.idexist =e);
    
    setTimeout(() => 
    {
      if (this.idexist) {
        this.bundleIdEntered = false;
        Swal.fire({
          icon: 'error',
          title: 'Bundle Already Exists',
          text: 'The specified bundle already exists. Please enter a different Bundle Id.'
        });
      } else {
        this.bundleIdEntered = true;
        Swal.fire({
          icon: 'success',
          title: 'Bundle Available',
          text: 'You can proceed to enter details for the new bundle.'
        });
      }
    },200)
    
  }


}
