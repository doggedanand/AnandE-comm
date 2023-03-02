import { Component, OnInit } from '@angular/core';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined;
  constructor(private addProducts: SellerAddProductService) { }

  ngOnInit(): void {
  }
  submit(data: productListAdd) {
    console.warn(data);
    return this.addProducts.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = "Product is successfull added";
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)




    })

  }
}
