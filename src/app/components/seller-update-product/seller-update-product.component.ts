import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | productListAdd;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private productService: SellerAddProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;

    })
  }
  submit(data: productListAdd) {
    if(this.productData){
      data.id=this.productData.id;
    }
    console.warn(data);
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);

  }
}
