import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../../service/service.service'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[];
  amount: number = 1;
  constructor(private service: ServiceService) {
    this.orders = this.service.getOrder();
    console.log(this.orders);
    for (let i = 0; i < this.orders.length; i++) {
      const product = this.service.Details(this.orders[i].product_id);
      this.orders[i]["name"] = product.name;;
      this.orders[i]["url"] = product.url;
      this.orders[i]["unit_price"] = product.price;
    }
   }

  ngOnInit(): void {
  }

  checkAmount(order: any)
  {
    if(order)
    {
   
      return order.amount
    }
  }
  amountChanged(value: any, index: number)
  {
    this.orders[index].price = this.orders[index]["unit_price"] * value.value; 
  }
}
