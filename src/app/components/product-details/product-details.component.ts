import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | productListAdd;
  productQuantity: number = 1;
  removeCart = false;
  cartData: productListAdd | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: SellerAddProductService) {

  }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: productListAdd) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: productListAdd) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })

      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addTwoCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // console.warn(this.productData);
        this.removeCart = true;
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else {
        console.warn('user is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        // console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
          // console.warn('result',result);

        })


      }

    }
  }
  removeTwoCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      // this.removeCart = false;
    } else {
      console.warn(this.cartData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId);
        }
      })

    }
    this.removeCart = false;

  }

}
