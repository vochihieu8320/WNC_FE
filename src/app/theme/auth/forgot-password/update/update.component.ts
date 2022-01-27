import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2'
import {UserService} from '../../../../service/user/user.service'


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  formLogin:any;
  loading: boolean = false;
  error:any;
  isSubmit:boolean = false;
  params:any;
  regcode:any;
  email:any;
  constructor(private router: Router, private route: ActivatedRoute, private service: UserService) {

   }

  ngOnInit(){
    this.formLogin = {
      password: "",
      password_confirmation: ""
    }
    this.regcode = this.route.snapshot.paramMap.get("regcode");
    this.route.queryParamMap
    .subscribe((params) => {
      this.params = {...params };
    }
    );
    this.params = this.params.params;
    this.email = this.params.email;
  }

  async update()
  {
    if(this.formLogin.password != this.formLogin.password_confirmation)
    {
      Swal.fire(
        'Error!',
        'Password confirm not match!',
        'error'
      )
    }
    else
    {
      delete this.formLogin.password_confirmation
      const body = {
        email: this.email,
        regCode: this.regcode,
        password: this.formLogin.password
      }
      try {
        await this.service.check_forgot_pwd(body);
        Swal.fire(
          'Good job!',
          'Update password successfully!',
          'success'
        )
        this.router.navigate(['auth/login']);
      } catch (error) {
        Swal.fire(
          'Error!',
          'Cant not update password',
          'error'
        )
      }
    }
  }

}
