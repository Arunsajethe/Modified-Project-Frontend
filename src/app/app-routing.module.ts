import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './home/view-product/view-product.component';
import { CreateProductComponent } from './home/create-product/create-product.component';
import { WholeProductComponent } from './home/whole-product/whole-product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { EditProductComponent } from './home/edit-product/edit-product.component';
import { CreateBundleComponent } from './home/create-bundle/create-bundle.component';
import { ViewBundleComponent } from './home/view-bundle/view-bundle.component';

const routes: Routes = [
  {
    path:"view",
    component:ViewProductComponent
  },
  {
    path:"create",
    component: CreateProductComponent
  },
  {
    path:"fullproduct/:pid",
    component: WholeProductComponent
  },
  {
    path:"edit/:pid",
    component:EditProductComponent

  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"homepage",
    component:HomepageComponent
  },
  {
    path:"create-bundle",
    component: CreateBundleComponent
  },
  {
    path: "view-bundle",
    component: ViewBundleComponent
  },
  {
    path:"**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
