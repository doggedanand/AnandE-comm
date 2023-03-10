import { Component, OnInit } from '@angular/core';
import { ISellerAuth, sellerLogin } from 'src/app/interface/iseller-auth';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  constructor(private user: UserServiceService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: ISellerAuth) {
    // console.warn(data);
    this.user.userSignUp(data)
  }
  login(data: sellerLogin) {
    this.user.userLogin(data);

  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
