import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productListAdd } from '../interface/iseller-auth';

@Injectable({
  providedIn: 'root'
})
export class SellerAddProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(data:productListAdd) {
    this.http.post('http://localhost:3000/products',data).subscribe((result)=>{
      console.log(result);
      
    })

  }

}
