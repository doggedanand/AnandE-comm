import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/interface/iseller-auth';
import { SellerAddProductService } from 'src/app/services/seller-add-product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: SellerAddProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }

}

