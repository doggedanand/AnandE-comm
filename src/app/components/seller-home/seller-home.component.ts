import { Component, OnInit } from '@angular/core';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productListShow: undefined | productListAdd[]
  productMessage:undefined|string;
  constructor(private productLists: SellerAddProductService) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number) {
    console.warn("test id", id);
    this.productLists.deleteWithId(id).subscribe((result) => {
      if(result){
        this.productMessage="Product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage=undefined;
    }, 3000);
  }
  list(){
    this.productLists.productList().subscribe((result) => {
      console.log(result);
      this.productListShow = result;
    })
  }

}
