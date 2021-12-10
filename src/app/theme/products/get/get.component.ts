import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../../service/service.service';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  products: any[] = [];
  constructor(private service: ServiceService) {
    this.products = <any>this.service.getDatas();
    console.log(this.products);
  }

  ngOnInit(): void {
  }

  details(products: any, index: any)
  {
    console.log(index)
  }
}
