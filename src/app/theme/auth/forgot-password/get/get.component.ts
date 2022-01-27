import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {UserService} from '../../../../service/user/user.service'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  formLogin:any;
  loading: boolean = false;
  error:any;
  isSubmit:boolean = false
  constructor(private service: UserService) { }

  ngOnInit(){
    this.formLogin = {
      email: "",
    }
  }

  async forgotPassword()
  {
    try {
      this.loading = true;
   
      const result = <any>await this.service.forgotPassword(this.formLogin);
      console.log(result)
      if(result.status == 400) {
        Swal.fire(
          'Error!',
          'Invalid email!',
          'error'
        )
      }
      else{
        Swal.fire(
          'Good job!',
          'Please check your email!',
          'success'
        )
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }
}
