import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './service/auth/auth.service';
import {ProductService} from './service/product/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Auction';
  categories: any;
  user_type:any;
  constructor(private router: Router, private route: ActivatedRoute,
    private service: ProductService,
    private authService: AuthService)
  {
    const local = <any> localStorage.getItem("currentUser");
    if(local) {
      this.user_type = JSON.parse(local)["user_type"];
    }
  }

  async ngOnInit() {
    this.categories = await this.service.all_categories();
  }
  checkorder()
  {
    this.router.navigate([`products/orders`]);
  }
  home(){
    this.router.navigate([`products`]);
  }
  login(){
    this.router.navigate([`auth/login`]);
  }
  register(){
    this.router.navigate([`auth/register`]);
  }
  user(){
    this.router.navigate([`user`]);
    
  }
  islogin(){
    return (localStorage.getItem("currentUser"))? true : false;
  }
  logout(){
    this.authService.logout();
    this.router.navigate([`auth/login`]);
  }

  search(name: any)
  {
    this.router.navigate( ['/products/search'],
    { queryParams: { category: name } });
  }
}
