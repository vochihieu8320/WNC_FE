import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import {UserService} from '../../../service/user/user.service'

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
  messages: any;
  current_user: any;
  holder: any;
  current_bid: any;
  user_name: any;
  current_maxprice: any;
  related_products: any;
  rating: any;
  find_holder:any;
  seller: any;
  find_seller: any;
  rating_seller: any;
  form_description: any = {
    productID: "",
    message: "",
  };
  product_description: any;
  isSubmit:boolean = false;
  constructor(private service: ProductService, 
    private router: Router, private route: ActivatedRoute, 
    private userService: UserService) 
  { 
    this.product_id = this.route.snapshot.paramMap.get("id");
  }

  async ngOnInit() 
  {
    this.loading = true;
    const result = <any> await this.service.show(this.product_id);
    this.product = result[0];
    this.find_holder = <any> await this.userService.show(this.product.auction.holderID);
    const rating_length = Math.floor(this.find_holder.rating / 2)
    this.rating = Array(rating_length).fill(0);
    this.holder = this.find_holder.data.name;
    this.find_seller = <any> await this.userService.show(this.product.seller);
    const rating_seller_length = Math.floor(this.find_seller.rating / 2);
    this.rating_seller =  Array(rating_seller_length).fill(0);
    this.seller = this.find_seller.data.name;

    this.sub_img = JSON.parse(this.product.sub_img);
    const local = <any> localStorage.getItem("currentUser");
    this.userID = JSON.parse(local)["id"];
    this.user_name = JSON.parse(local)["name"];
    this.current_bid = await this.userService.currentBide(this.userID, this.product._id);
    const related_products = {
      productID: this.product._id,
      category: this.product.category
    }
    this.related_products = await this.service.relateProduct(related_products);
    //get all of description

    this.product_description = await this.service.get_description(this.product_id)
    this.loading = false;

    this.socket = io("http://localhost:5000");
    this.socket.on("connect", () => {
    
    });

    this.socket.emit("join-room", this.product._id, (response:any)=>{
    })

    this.socket.on("room-messages", (message:any)=>{
      this.messages = message;
    })
    // received-messages
    this.socket.on("received-messages", async(message:any, user: any)=>{
        if(this.messages.length > 0 && this.messages[this.messages.length - 1].price === message.price)
        {
          await this.service.delete_history(message._id)
        }
        else
        {
          message.owner = user;
          this.product.auction.min_price = message.price
          this.holder = user.name;
          this.messages.push(message);      
          
        }
    })
  }

  change(event: any){
    this.size = event.target.id
    console.log(this.size)
  }

  async sugget_price(){
    try {
      const suggest = <any> await this.service.sugget_price(this.product_id);
      this.min_price = +suggest.min_price+ (+this.bide_step);
      Swal.fire({
        title: `Bạn có đồng ý đấu giá sản phẩm với giá ${this.min_price}$`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then(async(result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.product.auction.min_price = this.min_price
          const body = {
            userID: this.userID,
            productID: this.product_id,
            current_price: this.min_price,
            bid_step: this.bide_step,
            auto_bide : 0
          }
          let result = <any> await this.service.manual_bid(body);
          if(result.data)
          {
            this.product.auction.min_price = result.data.price;
            const userinfo = <any> await this.userService.show(result.data.userID);
            result.data.owner = userinfo;
            this.current_bid.auto_bide = 0
            this.socket.emit("bide", result.data)
          }
          this.loading = false;
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
         
        }
      })
    } catch (error) {
      
    }
  }

  async auto_bide(){
    const suggest = <any> await this.service.sugget_price(this.product_id);
    let max_price:any;
    Swal.fire({
      title: 'Hãy nhập giá trị tối đa bạn có thể trả cho sản phẩm này',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (price) => {
        if(+price < +this.product.auction.min_price) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Giá trị tối đa trả cho sản phẩm phải lớn hơn giá trị hiện tại của sản phẩm',
           
          })       
          return false
        }
        this.min_price = +suggest.min_price+ (+this.bide_step);
        this.product.auction.min_price = this.min_price
        max_price = price;
        this.current_bid.max_price = max_price;
        return true
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Bạn có muốn hệ thống tự động đấu giá sản phẩm dựa trên bước giá ${this.bide_step}$ 
          và giá trị tối đa là ${max_price}$ ?`,
        
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const body = {
              userID: this.userID,
              productID: this.product_id,
              current_price: this.min_price,
              auto_bide: 1,
              bid_step: this.bide_step,
              max_price: +max_price
            }
            const result = <any> await this.service.manual_bid(body);
            if(result.data)
            {
              const find_holder = <any> await this.userService.show(result.userID);
              console.log(find_holder)
              let message = result.data;
              message.owner = find_holder
              this.messages.push(message);
              this.current_bid.auto_bide = 1
            }
            Swal.fire('Sản phấm đã được đấu giá tự động', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }
    })
    
  }

  async relatedProducts(productID:any){
    try {
      this.router.navigate([`/products/${productID}`])
    } catch (error) {
      
    }
  }

  async add_love_list()
  {
    try {
      const body = {
        userID: this.userID,
        productID: this.product_id
      }
      await this.service.add_love_list(body);
      Swal.fire('Sản phấm đã được thêm vào danh sách yêu thích', '', 'success')
    } catch (error) {
      
    }
  }

  async add_description(){
    this.form_description.productID = this.product_id;
    try {
      this.loading = true
      const result = await this.service.add_description(this.form_description);
      this.product_description.push(result);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
}
