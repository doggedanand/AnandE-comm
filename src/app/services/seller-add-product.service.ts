import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, productListAdd } from '../interface/iseller-auth';

@Injectable({
  providedIn: 'root'
})
export class SellerAddProductService {
  cartData = new EventEmitter<productListAdd[] | []>();

  constructor(private http: HttpClient) {
  }
  addProduct(data: productListAdd) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<productListAdd[]>('http://localhost:3000/products');
  }
  deleteWithId(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<productListAdd>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: productListAdd) {
    return this.http.put<productListAdd>(`http://localhost:3000/products/${product.id}`, product);
  }
  popularProducts() {
    return this.http.get<productListAdd[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<productListAdd[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<productListAdd[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data: productListAdd) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: productListAdd[] = JSON.parse(cartData);
      items = items.filter((item: productListAdd) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
      // console.warn(items);

    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http.get<productListAdd[]>(`http://localhost:3000/cart/?userId=` + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      })
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart/?userId=' + userData.id);
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data)
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }
  deleteCartItems(cartId:number){

    return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    })
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }

}
