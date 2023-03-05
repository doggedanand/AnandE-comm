import { Component, OnInit } from '@angular/core';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|productListAdd[];
  trendyProducts:undefined|productListAdd[];
  constructor(private product:SellerAddProductService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

}
