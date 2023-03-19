import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ISellerAuth, sellerLogin } from '../interface/iseller-auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  // for error show 
  isLoginError = new EventEmitter<boolean>(false);  

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: ISellerAuth) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home'])

      })

  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: sellerLogin) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,

      { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          console.log('user logged in');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home'])
        } else {
          console.log('login failed');
          this.isLoginError.emit(true);
        }
        // this.isSellerLoggedIn.next(true);

      })
    // console.warn(data);

  }
}
