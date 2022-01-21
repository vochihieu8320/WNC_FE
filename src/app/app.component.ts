import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './service/auth/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStore';
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService)
  {

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
}
