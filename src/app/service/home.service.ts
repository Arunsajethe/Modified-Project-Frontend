import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../home/pojo/product';
import { Observable } from 'rxjs';
import { Register } from '../register/pojo/register';
import { Bundle } from '../home/pojo/bundle';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private url:string  = "http://localhost:2002/product"

  private url1:string = "http://localhost:2003/register";

  private url2:string = "http://localhost:2004/bundle";

  constructor(private http:HttpClient)
  {

  }

  //add product to database
  addProduct(prod:Product)
  {
    return this.http.post(`${this.url}/insert`,prod);
  }

  // To display all the product from the database
  viewProduct():Observable<Product>
  {
    return this.http.get<Product>(`${this.url}/display`);
  }

  deleteProduct(pid:number):Observable<any>
  {
    const params = new HttpParams().set('pid',pid);
    return this.http.delete<Product>(`${this.url}/deleteProduct`,{params});
  }

  //getting single product from database using product id
  getSingleProduct(pid:number):Observable<Product>
  {
    return this.http.get<Product>(`${this.url}/singleproduct/${pid}`);
  }

  // editing or updating the product in the database
  updateProduct(product:Product,pid:number)
  {
    return this.http.put<Product>(`${this.url}/editProduct/${pid}`,product);
  }

  // For registering user to the database
  addRegister(register:Register)
  {
    return this.http.post(`${this.url1}`,register);
  }

  // For getting user details from the database
  checkLogin(email:string, password:string):Observable<Register>
  {
    return this.http.get<Register>(`${this.url1}/loginCheck/${email}/${password}`);
  }

  // For checking email whether it is already registered
  checkEmail(email:string):Observable<any>
  {
    return this.http.get(`${this.url1}/emailCheck/${email}`)
  }

  // Create Bundle
  addBundle(bundle:any)
  {
    return this.http.post(`${this.url2}/insert`,bundle);
  }

  // checking Bundle id is unique or not
  checkId(bundle_id:any):Observable<any>
  {
    return this.http.get(`${this.url2}/check/${bundle_id}`,{responseType:'json'})
  }

  // getting product as list by bundle
  getProducts(my_id:any):Observable<any>
  {
    console.log(my_id);
    return this.http.get(`${this.url}/displayByBundle/${my_id}`)
  }

  // get all bundle
  getBundle():Observable<any>
  {
    return this.http.get(`${this.url2}/display`)
  }
  
}
