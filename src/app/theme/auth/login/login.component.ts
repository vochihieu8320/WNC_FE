import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  isSubmit:boolean = false;
  loading: boolean = false;
  error:any;
  constructor(private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.formLogin = {
      email: "",
      password: "",
    }
  }
  
  async login(){
    try {
      this.isSubmit = true;
      this.loading = true;
      const data = <any> await this.authService.login(this.formLogin);
      if(data.status == "400"){
        this.error = "Email not found"
      }
      else
      {
        this.authService.setLocalUserProfile(data.token, data.refreshToken);
      }
      this.loading = false;
      this.router.navigate([`/products`]);

    } catch (error :any) {
      this.error =error.error;
      this.loading = false;
    }
  }

  register(){
    this.router.navigate([`auth/register`]);
  }
}
