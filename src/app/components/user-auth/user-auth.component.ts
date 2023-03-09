import { Component, OnInit } from '@angular/core';
import { ISellerAuth } from 'src/app/interface/iseller-auth';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private user:UserServiceService) { }

  ngOnInit(): void {
  }
  signUp(data:ISellerAuth){
    // console.warn(data);
    this.user.userSignUp(data)
    
  }
}
