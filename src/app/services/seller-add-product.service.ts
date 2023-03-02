import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productListAdd } from '../interface/iseller-auth';

@Injectable({
  providedIn: 'root'
})
export class SellerAddProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(data: productListAdd) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList()
  {
    return this.http.get<productListAdd[]>('http://localhost:3000/products');
  }

  deleteWithId(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
