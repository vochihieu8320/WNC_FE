import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: any;
  product_id: any;
  size: any = "XL";
  amount: any= 1;
  sub_img: any;
  min_price: any;
  bide_step: any = 10;
  loading: boolean = false;
  userID:any;
  socket:any;
  messages: any
  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.product_id = this.route.snapshot.paramMap.get("id");
  }

  async ngOnInit() 
  {
    const result = <any> await this.service.show(this.product_id);
    this.product = result[0];
    this.sub_img = JSON.parse(this.product.sub_img);
    const local = <any> localStorage.getItem("currentUser");
    this.userID = JSON.parse(local)["id"];

    this.socket = io("http://localhost:5000");
    this.socket.on("connect", () => {
    
    });

    this.socket.emit("join-room", this.product._id, (response:any)=>{
      console.log(response);
    })

    this.socket.on("room-messages", (message:any)=>{
      this.messages = message;
      console.log(this.messages);
    })
    // received-messages
    this.socket.on("received-messages", (message:any, holder:any)=>{
      // this.messages.push(message);
      console.log("messages", this.messages);
      console.log("holder", holder)
    })
  }

  change(event: any){
    this.size = event.target.id
    console.log(this.size)
  }

  async sugget_price(){
    try {
      const result = <any> await this.service.sugget_price(this.product_id);
      this.min_price = +result.min_price+ (+this.bide_step);
      Swal.fire({
        title: `Bạn có đồng ý đấu giá sản phẩm với giá ${this.min_price}$`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then(async(result) => {
        if (result.isConfirmed) {
          this.loading = true;
          const body = {
            userID: this.userID,
            productID: this.product_id,
            current_price: this.min_price,
            auto_bide : 0
          }
          await this.service.manual_bid(body);
          this.loading = false;
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
         
        }
      })
    } catch (error) {
      
    }
  }

  async auto_bide(){
    const result = <any> await this.service.sugget_price(this.product_id);
    this.min_price = +result.min_price+ (+this.bide_step);
    Swal.fire({
      title: 'Bạn có muốn hệ thống tự động đấu giá sản phẩm dựa trên bước giá bạn đã đưa ra?',
    
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const body = {
          userID: this.userID,
          productID: this.product_id,
          current_price: this.min_price,
          auto_bide: 1
        }
        console.log(body);
        await this.service.manual_bid(body);
        this.loading = false;
        Swal.fire('Sản phấm đã được đấu giá tự động', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  async getUserProfile(userID: string){
    try {
      const result = <any> await this.service.userProfile(userID);
      console.log(result);
      return "voc chi hieu"
    } catch (error) {
      return "";
    }
  }
}
