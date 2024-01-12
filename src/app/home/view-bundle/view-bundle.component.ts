import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { DisplayByBundle} from '../pojo/DisplayBundle';

@Component({
  selector: 'app-view-bundle',
  templateUrl: './view-bundle.component.html',
  styleUrls: ['./view-bundle.component.css']
})
export class ViewBundleComponent {

  myprod :any=[]
  prod:any
  bundle:any
  mybundle:any=[]
  constructor(private service:HomeService)
  {
    this.service.getBundle().subscribe(e => this.bundle = e)
    this.service.viewProduct().subscribe(e => this.prod =e);
    console.log(this.bundle)
    setTimeout(() => {

      for(let bun of this.bundle)
      {
        console.log(bun.product_id);
        for(let p of bun.product_id)
        {
          for ( let x of this.prod)
          {
            if (p == x.pid)
              this.myprod.push(x);
          }
        }

        const temp = new DisplayByBundle(bun.bundle_id,bun.bundle_name,bun.bundle_desp,bun.bundle_category,bun.product_id,this.myprod)
        this.mybundle.push(temp);
        this.myprod=[]
      }
    }, 2000)
    
    

  }

}
