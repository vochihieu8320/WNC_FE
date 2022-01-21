import { Injectable } from '@angular/core';
import {Data} from "../data/data"

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  product: any;
  order_details: any[]
  constructor(private data: Data) {
    this.product = this.data.User();
    this.order_details = []
  }

  addOrder(order_detail: any) {
    this.order_details.push(order_detail);
  }
  getOrder(){
    return this.order_details
  }

  getDatas(){
    return this.product;
  }
  createData(data : any[], value : any)
  {
    data.push(value);
  }
  deleteDatas(index: number)
  {
    this.product.splice(index, 1);    
  }
  Details( index: number)
  {
    return this.product[index]
  }
  update(index : number, value: any)
  {
    this.product[index] = value;
  }

}
