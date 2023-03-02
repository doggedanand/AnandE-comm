export interface ISellerAuth {
    name: string;
    password: string;
    email: string;
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
}
