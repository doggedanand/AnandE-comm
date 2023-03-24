import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharges: 0,
    total: 0,
  };

  constructor(private product: SellerAddProductService, private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      // console.warn(result);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.deliveryCharges = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10)
      console.warn(this.priceSummary);

      // console.warn(price);

    });
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
}
