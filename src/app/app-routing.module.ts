import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthGuard } from './auth-guard/seller-auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'seller-auth', component: SellerAuthComponent
  },
  {
    path: 'seller-home', component: SellerHomeComponent, canActivate: [SellerAuthGuard]
  },
  {
    path: 'seller-add-product', component: SellerAddProductComponent, canActivate:[SellerAuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
