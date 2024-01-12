import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  //setting key and value in session storage & also for login service
  setItem(key:string,value:any): void 
  {
    sessionStorage.setItem(key,JSON.stringify(value));
  }

  // getting key and value from session storage 
  getItem(key:string): any
  {
    const storedvalue = sessionStorage.getItem(key);
    return storedvalue ? JSON.parse(storedvalue) : null;
  }

  // removing key and value from session storage & also for logout purpose
  removeItem(key:string): void 
  {
    sessionStorage.removeItem(key);
  }

  isLogined():boolean{
    return !!this.getItem('login');
  }
  
}
