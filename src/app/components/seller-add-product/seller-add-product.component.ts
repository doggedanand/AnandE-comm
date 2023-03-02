import { Component, OnInit } from '@angular/core';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private addProducts:SellerAddProductService) { }

  ngOnInit(): void {
  }
  addProduct(data: productListAdd) {
    console.warn(data);
   return this.addProducts.addProduct(data)

  }
}
