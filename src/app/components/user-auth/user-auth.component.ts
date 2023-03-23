import { Component, OnInit } from '@angular/core';
import { cart, ISellerAuth, productListAdd, sellerLogin } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = "";
  constructor(private user: UserServiceService, private product: SellerAddProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: ISellerAuth) {
    // console.warn(data);
    this.user.userSignUp(data)
  }
  login(data: sellerLogin) {
    this.user.userLogin(data);
    this.user.invalidUserAuthError.subscribe((result) => {
      console.warn("apple", result);
      if (result) {
        this.authError = "Please enter valid user details";
      } else {
        this.localCartToRemoteCart();
      }

    })

  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: productListAdd[] = JSON.parse(data);
      

      cartDataList.forEach((product: productListAdd, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in db');
            }
            if (cartDataList.length === index + 1) {
              localStorage.removeItem('localCart');
            }
          })
        }, 500);

      });
    };
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
