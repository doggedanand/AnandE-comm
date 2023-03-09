import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productListAdd } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | productListAdd[];
  constructor(public activeRoute: ActivatedRoute, private productService: SellerAddProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.productService.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    })

  }
}
