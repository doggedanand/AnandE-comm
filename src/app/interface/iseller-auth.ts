export interface ISellerAuth {
    name: string;
    email: string;
    password: string;
}

export interface sellerLogin {
    email: string;
    password: string;

}

export interface productListAdd{
    name:string;
    price:string; 
    category:string;
    color:string;
    description:string;
    image:string;
    id:number;
    quantity:undefined|number;
    productId:undefined|number;
}
export interface cart{
    name:string;
    // there is an issues here in price 
    price:string; 
    category:string;
    color:string;
    description:string;
    image:string;
    id:number|undefined;
    quantity:undefined|number;
    productId:number,
    userId:number
  }
  export interface priceSummary{
    price:number;
    discount:number;
    tax:number,
    deliveryCharges:number,
    total:number
  }
export interface order{
    email:string;
    address:string;
    contact:string;
    totalPrice:number;
    userId:number
}