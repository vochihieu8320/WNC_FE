import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product/product.service'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  products: any[] = [];
  name:any;
  formSearch: any;
  best_price:any;
  last_minute: any;
  hot_trends: any;
  loading: boolean = false;
  categories: any;
  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) {
  
  }

  async ngOnInit(){
    this.formSearch = {
      name: ""
    }
    this.loading = true;
    this.hot_trends = <any> await this.service.hot_trends();
    this.last_minute = <any> await this.service.last_minute();
    for(let i = 0; i < this.last_minute.length; i++) {
     const auction = await this.service.auction(this.last_minute[i]._id);
     this.last_minute[i]["auction"] = auction
    }
  
    this.best_price = <any> await this.service.best_price();

    //get categories
    this.loading = false;
  }

  details(products: any, index: any)
  {
    this.router.navigate([`products/${index}`]);
  }
  login(){
    this.router.navigate([`auth/login`]);
  }
  search(){
    this.router.navigate(
      ['/products/search'],
      { queryParams: { name: this.formSearch.name } }
    );
  }
 view(productID: any){
  this.router.navigate([`products/${productID}`]);
 }
 picked(value: any){
  this.router.navigate(
    ['/products/search'],
    { queryParams: { category: value } }
  );
}
}
