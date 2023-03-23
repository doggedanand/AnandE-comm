import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthGuard } from './auth-guard/seller-auth.guard';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [SellerAuthGuard] },
  { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [SellerAuthGuard] },
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [SellerAuthGuard] },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'cart-page', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
