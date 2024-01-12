import { Component } from '@angular/core';
import { Feature } from '../pojo/feature';
import { Parameter } from '../pojo/parameter';
import { Product } from '../pojo/product';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [
    trigger('stepAnimation', [
      state('incomplete', style({
        transform: 'scale(1)',
      })),
      state('completed', style({
        transform: 'scale(1.1)', // Increase size on completion (optional)
      })),
      transition('incomplete => completed', animate('0.5s ease-out')),
    ]),
  ]
})
export class EditProductComponent {

  // progress bar icon parameters 
  steps = [
    { name: 'Product', icon: 'fa-check', state: 'incomplete' },
    { name: 'Feature', icon: 'fa-check', state: 'incomplete' },
    { name: 'Parameter', icon: 'fa-check', state: 'incomplete' },
    { name: 'Finish', icon: 'fa-check', state: 'incomplete' },
  ];

  formIndex: number = 0;
  lineClass: string = 'line';
  forms: any[] = [];
  params:any[] = [{  pa_name:'', pa_desp:'',pa_details:'',  para_type:''}];


  // For animation purpose in the form
  getProgressBarState(index: number): string {
    const completedSteps = this.steps.slice(0, index).filter(step => step.state === 'completed').length;
    return completedSteps === index ? 'completed' : 'incomplete';
  }


  // For Progress bar icon 
  getIconUrl(icon: string): string {
    switch (icon) {
      case 'Product':
        return 'https://cdn-icons-png.flaticon.com/128/3778/3778800.png?ga=GA1.1.715273591.1697777478'; 
      case 'Feature':
        return 'https://cdn-icons-png.flaticon.com/128/5949/5949139.png?ga=GA1.1.715273591.1697777478'; 
      case 'Parameter':
        return 'https://cdn-icons-png.flaticon.com/128/983/983789.png';
      case 'Finish':
        return 'https://cdn-icons-png.flaticon.com/128/9280/9280764.png?ga=GA1.1.715273591.1697777478';   
      default:
        return 'Default'; 
    }
  }

  pid:number =0;
  product:Product;
  featureList:Feature
  param:Parameter;
  myProduct:any;

  constructor(private session:SessionStorageService, private router: Router, private service: HomeService, private active:ActivatedRoute)
  {
    //For displaying the form1 Product data only.
    this.session.setItem("form1",true);
    this.session.setItem("form2",false);
    this.session.setItem("form3",false);

    this.active.params.subscribe((params)=>
    {
      this.pid = params['pid'];
    });

    timer(1000);

    this.service.getSingleProduct(this.pid).subscribe((e)=> this.myProduct = e);

    this.product = new Product(0,'','','',0,'',[]);
    this.featureList = new Feature(0,'','','',[]);
    this.param=new Parameter(0,'','','','OTHER')

    
  }

  // To add the element in the form array
  addForm(feat:Feature) {
    const newForm = {fid: 0, fname: '', fdesp: '', fdetails: '', parameters:[{para_id:0 ,para_name:'', para_desp:'',para_details:'',  para_type:''}] };
    this.forms.push(newForm);
  }

  // For loading the data in the form 2 and form 3
  dataLoading()
  {
    this.forms = []
    for(let f of this.myProduct.feature)
    {
      this.forms.push(f);
    }
  }

  // Remove the element from the form at the specified index
  removeForm(index: number) {
    if (this.forms.length > 1) {
      this.forms.splice(index,1);
    }
  }

  // add the element's parameter in the specified index from the form
  addParameter(index:number,para:Parameter)
  {
    const newForm = {para_id:0 ,para_name:'', para_desp:'',para_details:'',  para_type:''};
    this.forms[index].parameters.push(newForm);
  }

  // remove the element's parameter in the specified index in the form
  removeParameter(index:number, para_index:number)
  {
    if (this.forms[index].parameters.length > 1) {
      this.forms[index].parameters.splice(para_index,1);
    }
  }

  //When next button of form1 is clicked this method is executed to display the form2 Feature only.
  nextStepForm1()
  {
    console.log("form2 to be displayed ");
    this.session.setItem("form1",false);
    this.session.setItem("form2",true);
    this.session.setItem("form3",false);
    this.formIndex=1;
    this.lineClass = 'line dark-black feature';

    this.dataLoading();
  }

  //When next button of form2 is clicked this method is executed to display the form3 Paramter only.
  nextStepForm2()
  {
    this.product.feature=[];
    for(let form of this.forms)
    {
      this.product.feature.push(new Feature(0,form.fname,form.fdesp,form.fdetails,[]));
    }
    this.session.setItem("form1",false);
    this.session.setItem("form2",false);
    this.session.setItem("form3",true);
    this.formIndex = 2;
    this.lineClass = 'line dark-black parameter';
  }

  // This method is executed when the submit button is clicked in form3, that is Parameter 
  onSubmit()
  {
    this.product.feature =[];

    this.product.pid = this.myProduct.pid;
    this.product.pname = this.myProduct.pname;
    this.product.desp = this.myProduct.desp;
    this.product.details = this.myProduct.details;
    this.product.maxLocations = this.myProduct.maxLocations;
    this.product.category = this.myProduct.category;
    let m =0;
    for(let f of this.forms)
    {
      this.product.feature.push(new Feature(f.fid,f.fname,f.fdesp,f.fdetails,[]));
      for(let f1 of this.forms[m].parameters)
      {
        this.product.feature[m].parameters.push(new Parameter(f1.para_id,f1.para_name,f1.para_desp,f1.para_details,f1.para_type));
      }
      m=m+1;
    }

    Swal.fire({
      icon:"success",
      title:"Product Created"
    })
    this.lineClass = 'line dark-black finish'

    console.log(this.product);

    this.service.updateProduct(this.product,this.pid).subscribe();
    

    this.router.navigateByUrl("/view");
  }

  // When the previous button is clicked in the form2 feature form to back to product form page
  previousStepForm2()
  {
    this.session.setItem("form1",true);
    this.session.setItem("form2",false);
    this.session.setItem("form3",false);
    this.formIndex = 0;
    this.lineClass = 'line ';
  }

  // When the previous button is clicked in the form2 feature form to back to product form page
  previousStepForm3()
  {
    this.session.setItem("form1",false);
    this.session.setItem("form2",true);
    this.session.setItem("form3",false);
    this.formIndex = 1;
    this.lineClass = 'line dark-black feature';
  }

  // For checking purpose to display form1
  form1():boolean
  {
    const form = this.session.getItem("form1");
    if(form ==true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  // For checking purpose to display form1
  form2():boolean
  {
    const form = this.session.getItem("form2");
    if(form ==true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  // For checking purpose to display form1
  form3():boolean
  {
    const form = this.session.getItem("form3");
    if(form ==true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


}
