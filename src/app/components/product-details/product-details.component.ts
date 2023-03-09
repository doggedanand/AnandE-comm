import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | productListAdd;
  productQuantity: number = 1;
  constructor(private activeRoute: ActivatedRoute, private product: SellerAddProductService) {

  }

  ngOnInit(): void {
    let product = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(product);
    product && this.product.getProduct(product).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity+= 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity-= 1;
    }
  }

}
