import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-becomeseller',
  templateUrl: './becomeseller.component.html',
  styleUrls: ['./becomeseller.component.css']
})
export class BecomesellerComponent implements OnInit {

 
  formRequest:any = {
    content: "",
    status: "1",
    owner: ""
  }
  isSubmit:boolean = false
  constructor(private service: UserService) { }

  ngOnInit(){
    const local = <any> localStorage.getItem("currentUser");
    const userID = JSON.parse(local)["id"];
    this.formRequest.owner = userID
  }

  async save(){
    try {
      await this.service.bider_seller(this.formRequest);
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Chúng tôi sẽ sớm phản hồi với bạn, xin cảm ơn',
      })
    } catch (error) {
      
    }
  }

}
