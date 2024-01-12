import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeRoutingModule } from './home-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { FormsModule } from '@angular/forms';
import { WholeProductComponent } from './whole-product/whole-product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { ViewBundleComponent } from './view-bundle/view-bundle.component';


@NgModule({
  declarations: [
    CreateProductComponent,
    ViewProductComponent,
    WholeProductComponent,
    HomepageComponent,
    EditProductComponent,
    CreateBundleComponent,
    ViewBundleComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports:[
    CreateProductComponent,
    ViewProductComponent,
    WholeProductComponent,
    HomepageComponent,
    EditProductComponent,
    CreateBundleComponent,
    ViewBundleComponent
  ]
})
export class HomeModule { }
