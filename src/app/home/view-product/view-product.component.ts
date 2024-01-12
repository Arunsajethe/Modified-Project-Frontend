import { Component } from '@angular/core';
import { Product } from '../pojo/product';
import { Feature } from '../pojo/feature';
import { Parameter } from '../pojo/parameter';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  
  productArr:any;

  constructor(private service:HomeService)
  {
    
    this.service.viewProduct().subscribe( (e:any) =>{
      console.log(e);
      this.productArr=e;
    } );

  }

  removeProduct(pid:number)
  {
    this.service.deleteProduct(pid).subscribe();

    this.service.viewProduct().subscribe( (e:any) =>{
      console.log(e);
      this.productArr=e;
    } );

    
  }

  
}
