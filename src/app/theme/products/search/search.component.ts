import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { environment } from '../../../../environments/environment';
import {ProductService} from '../../../service/product/product.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  params:any;
  url:any;
  products:any;
  loading: boolean = false;
  totalItems: number = 10
  pagesize : number = 6;
  maxSize :number = 4;
  currentPage: number = 0;
  categories: any;
  currentCheck:any;
  constructor(private router: Router, private route: ActivatedRoute, private service:ProductService) { }

  async ngOnInit(){
    this.route.queryParamMap
    .subscribe((params) => {
      this.params = {...params };
    }
    );

  this.params = this.params.params

  this.url = `name=${this.params.name}`
  const result = <any> await this.service.index(0, 6, this.url);
  this.categories = <any> await this.service.categories();
  this.products = result.data;
  this.totalItems = result.count;

  if(this.products.length === 0){
    this.url = `category=${this.params.name}`
    const result = <any> await this.service.index(0, 6, this.url);
    this.products = result.data;
    this.totalItems = result.count;
  }
  }
  async select(value:any){
    const expression = value.value;
    let url = this.url
    switch(expression) {
      case "Price A-Z":
        // code block
        url += `&sortBy=price&order=1`
        break;
      case "Price Z-A":
        url += `&sortBy=price&order=-1`
        break;
      case "Ended At A-Z":
        url += `&sortBy=date_bid&order=1`       
        break;
      case "Ended At Z-A":
        url += `&sortBy=date_bid&order=-1`       
        break;
      
      default:
    } 
  try {
    this.loading = true;
    const result = <any> await this.service.index(0, 6, url);
    this.products = result.data;
    this.totalItems = result.count;
    this.loading = false;
  } catch (error) {
    
  }
  }

  async onPageChange(pageNum: number)
  {
    let skip = (pageNum-1) * 5; 
    const result = <any> await this.service.index(skip, 6, this.url);
    this.products = result.data;
  }

  change(category_name:any){
    this.currentCheck = category_name;
  }

  async apply(){
    this.url = `category=${this.currentCheck}`;
    try {
      const result = <any> await this.service.index(0, 6, this.url);
      this.products = result.data;
      this.totalItems = result.count;
    } catch (error) {
      console.log(error)
    }
  }
}
