import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productListAdd } from '../interface/iseller-auth';
import { SellerAddProductService } from '../services/seller-add-product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | productListAdd[];
  userName: string = "";
  cartItem = 0;
  constructor(public route: Router, private product: SellerAddProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn("in seller area")
          // if (localStorage.getItem('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = "default"
          // console.warn("outside seller");
        }
        // } 
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length
    }
    // for cart refresh 
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.product.cartData.emit([]);
  }
  userLogout() {
    // this.logout();
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['details/' + id]);
  }

  submitSearch(val: string) {
    // console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
