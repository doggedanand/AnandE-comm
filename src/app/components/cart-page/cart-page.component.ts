import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[]|undefined;

  constructor(private product:SellerAddProductService) {

   }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result;
      // console.warn(result);

      
    })
  }

}
