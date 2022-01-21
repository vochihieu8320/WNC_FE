import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service'
import Swal from 'sweetalert2'
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister:any;
  error:any;
  formOIP:any;
  isSubmit:boolean = false;
  loading:boolean = false;
  constructor(private authService:AuthService, 
  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.formRegister = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      user_type: "1"
    }
    this.formOIP = {
      email: "",
      otp:""
    }
  }

  async getOTP(){
    try {
      const body = {
        email: this.formRegister.email
      }
      Swal.fire(
        'Good job!',
        'Please check your email!',
        'success'
      )
      await this.authService.getOtp(body);
    } catch (error) {
      console.log(error)
    }
  }
  
  async register(){
    try {
      //check otp
      this.loading = true;
      this.formOIP.email = this.formRegister.email;
      console.log(this.formOIP)
      const check_otp = <any>await this.authService.checkOTP(this.formOIP);
      console.log(check_otp)
      if (check_otp.status == "400") {
        this.loading = false;
        this.error = "Invalid OTP"
      }
      else
      {
        if(this.formRegister.password !== this.formRegister.password_confirmation) {
          this.loading = false;
          this.error = "Password confirm not match";
        }
        else
        {

          delete this.formRegister.password_confirmation
          console.log(this.formRegister)
          const data = <any> await this.authService.register(this.formRegister);
          this.authService.setLocalUserProfile(data.token, data.refreshToken);
          Swal.fire(
            'Good job!',
            'Resgier successfully!',
            'success'
          )
          this.loading = false;
          this.router.navigate([`auth/login`]);

        }
      
    }
    } catch (error :any) {
      console.log(error)
      this.error = error.error;
      this.loading = false;
    }
  }
}
