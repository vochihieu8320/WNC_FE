import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from '../../service/user/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading: boolean = false
  user_type:any;
  userID:any;
  current_user:any;
  current_user_rating:any;
  user_form:any;
  isSubmit:boolean = false;
  products:any;
  totalItems: number = 10
  pagesize : number = 5;
  maxSize :number = 10;
  currentPage: number = 0;
  winners:any;
  comments:any;
  pagechange_type:any;
  totalItems_seller_products:any;
  totalItems_winner:any;
  totalItems_comment:any;

  //danh sách đang đấu giá
  user_biding:any;
  totalItems_user_biding:any;
  //danh sách yêu thích
  user_love_list:any;
  totalItems_userLovelist:any;
  //user winning list
  user_winning_list:any;
  totalItems_userWinning:any;

  constructor(private service: ProductService, 
    private router: Router, private route: ActivatedRoute, 
    private userService: UserService) { }

  async ngOnInit(){
    this.loading =true;
    const local = <any> localStorage.getItem("currentUser");
    this.userID = JSON.parse(local)["id"]
    this.user_type = JSON.parse(local)["user_type"];
    console.log(this.user_type)
    const result = <any> await this.userService.show(this.userID);
    const result_comment = <any> await this.userService.get_comments(this.userID, 0, 5);
    console.log(result_comment)
    this.comments = result_comment.data;
    this.totalItems_comment = result_comment.count;
    console.log(this.totalItems_comment)
    this.current_user = result.data;
    
    this.current_user_rating = (+result.rating / 2) || 5;
    this.user_form = {
      name: this.current_user.name,
      email: this.current_user.email,
      password: "",
      new_password: "",
      new_password_confirm: "",
    }
    this.user_form.password = "";
    if(this.user_type == "1")
    {
      //love list
      const result_love_list = <any> await this.service.get_love_list(this.userID);
      this.user_love_list = result_love_list.data;
      this.totalItems_userLovelist = result_love_list.count;
      //user biding list

      const result_user_biding_list = <any> await this.service.user_biding(this.userID, 0, 5);
      this.user_biding = result_user_biding_list.data;
      this.totalItems_user_biding = result_user_biding_list.count;
      this.totalItems = result_user_biding_list.count;
      //winer list
      const winner_temp = <any> await this.service.user_winner_list(this.userID, 0, 5);
      this.user_winning_list = winner_temp.data;
      this.totalItems_userWinning = winner_temp.count;
    }
    else
    {
      const result = <any> await this.service.sellerProduct(this.userID, 0, 5);
      this.products = result.data;
      this.totalItems = result.count;
      this.totalItems_seller_products = result.count
      const winner_temp = <any> await this.service.winnerProduct(this.userID, 0, 5);
      this.winners = winner_temp.data;
      this.totalItems_winner = winner_temp.count;

    }
    this.loading = false;
  }

  async save()
  {
    let check = true;
    if(this.user_form.password)
    {
      if(this.user_form.new_password_confirm !== this.user_form.new_password)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password không hợp lệ',
        })
      }
      else
      {
        //cập nhật mk
        const body = {
          email: this.current_user.email, 
          password: this.user_form.password, 
          new_password: this.user_form.new_password, 
          new_password_confirmation: this.user_form.new_password_confirm
        }
        const result = <any> await this.userService.changePwd(body)
        if(result.status == 400){
          check = false
        }
        
      }
    }
    if(check)
    {
      delete this.user_form.password
      delete this.user_form.new_password
      delete this.user_form.new_password_confirmation
      await this.userService.update_me(this.userID, this.user_form);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Cập nhật thành công',
      })
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password không hợp lệ',
      })
    }
      
    
  }

  async onPageChange(pageNum: any)
  {
    let skip = (pageNum-1) * 5; 
  
    switch(this.pagechange_type) {
      case "product_list":
        // code block
        if(this.user_type == 2)
        {
          const result = <any> await this.service.sellerProduct(this.userID, skip, 5);
          this.products = result.data;
          console.log(this.products)
        }
        break;
      case "reviews":
        const result_review = <any> await this.userService.get_comments(this.userID, skip, 5);
        this.comments = result_review.data;
        break;
      case "winner_list":
        const result_winer = <any> await this.service.winnerProduct(this.userID, skip, 5);
        this.winners = result_winer.data;
        break;
      case "Ended At Z-A":
        break;
      
      default:
    } 
  }

  async udpateAuction(product:any)
  {
    Swal.fire({
      title: 'Bạn có chắc chắc muốn chập nhận giá từ bider này?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
     
          this.loading = true;
          await this.service.udpateAuction(product.auction._id, {status: 2});
          this.loading = false;
          Swal.fire({
            title: `Xin chúc mừng sản phẩm ${product.name} đã được đấu giá thành công 
            với mức giá là ${product.auction.min_price} người chiến thắng là ${product.user[0].name}`,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
        } catch (error) {
          
        }
      } else if (result.isDenied) {
        Swal.fire('Saved!', '', 'info')
      }
    })
   
  }

  async rejectBid(product:any) 
  {
    
    Swal.fire({
      title: 'Bạn có chắc chắc từ chối bider này ra giá?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         try {
        this.loading =true;
        const body = { 
          userID: product.user[0]._id,
          productID: product._id
        }
        await this.service.rejectBide(body);
        this.loading = false;
      } catch (error) {
        this.loading =false;
        console.log(error)
      }
          Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Saved!', '', 'info')
      }
    })
   
  }

  async reject_auction(product:any)
  {
    Swal.fire({
      title: 'Bạn có chắc chắc muốn hủy giao dịch?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         try {
        this.loading =true;
        const body = { 
          userID: product.user[0]._id,
          productID: product._id
        }
        await this.service.rejectBide(body);

        const dislike = {
          like: 0
        }
        await this.userService.like(product.user[0]._id, dislike);
        const comment = {
          userID: product.user[0]._id,
          message: "Người chơi không thanh toán",
          ownerID: this.userID
        }
        await this.userService.commented(comment)
        this.loading = false;
      } catch (error) {
        this.loading =false;
        console.log(error)
      }
          Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Saved!', '', 'info')
      }
    })
  }
  async like(user:any)
  {
    Swal.fire({
      title: 'Hãy gửi gắm một vài điều về người chiến thắng của bạn',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: async(message) => {
        const body = {
          like: 1
        }
        try {
          await this.userService.like(user._id, body);
          const comment = {
            userID: user._id,
            message: message,
            ownerID: this.userID
          }
          const result = await this.userService.commented(comment);
          return true    
        } catch (error) {
          console.log(error);
          return false
        }
      
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: 'Cảm bạn đã gửi lời đánh giá!',
        })
      }
    })
  }

  async dislike(user:any)
  {
    Swal.fire({
      title: 'Hãy gửi gắm một vài điều về người chiến thắng của bạn',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: async (message) => {
        const body = {
          like: 0
        }
        await this.userService.like(user._id, body);
        const comment = {
          userID: user._id,
          message: message,
          ownerID: this.userID
        }
        await this.userService.commented(comment);
        return true
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: 'Cảm bạn đã gửi lời đánh giá!',
        })
      }
    })
  }

  test(value:any) {
    this.pagechange_type =value;
    switch(this.pagechange_type) {
      case "product_list":
        this.totalItems = this.totalItems_seller_products
        break;
      case "reviews":
        this.totalItems = this.totalItems_comment
        break;
      case "winner_list":
        this.totalItems = this.totalItems_winner
        break;
      case "user_biding":
        this.totalItems = this.totalItems_user_biding
        break;
      case "love_list":
        this.totalItems = this.totalItems_userLovelist
        break;
      default:
    } 
  }
 
  detail(value: any)
  {
    this.router.navigate([`products/${value}`])
  }

  async delete_love_list(id:any, index:any)
  {
    Swal.fire({
      title: 'Bạn có muốn xóa sản phẩm này khỏi danh sách yêu thích?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         try {
        this.loading =true;
        await this.service.delete_love_list(id);
        this.user_love_list.splice(index, 1)
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error)
      }
         Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Saved!', '', 'info')
      }
    })
  }

  product_detail(productID: any)
  {

  }

  validateFiles(value: any)
  {
    
  }
}
