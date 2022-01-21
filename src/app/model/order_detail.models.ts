export class OrderDetail {
    product_id: number;
    size: string;
    amount: number;
    price: string;
    constructor(product_id: number, size: string, amount: number, price: string)
    { 
       this.product_id = product_id;;
       this.size = size;
       this.amount = amount;
       this.price = price;
    }
  }