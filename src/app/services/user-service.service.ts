import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISellerAuth } from '../interface/iseller-auth';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient, private route:Router) { }
  userSignUp(user:ISellerAuth){
    // console.warn(user);
    this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
      
    })
    
  }
}
