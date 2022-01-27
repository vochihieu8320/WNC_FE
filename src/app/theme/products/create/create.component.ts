import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import Swal from 'sweetalert2';
import {ProductService} from '../../../service/product/product.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  file:any;
  file_array:any = [];
  loading:boolean = false;
  sub_img_array:any = [];
  upload_file:boolean = false;
  uploader: FileUploader = new FileUploader({
   
    isHTML5: true
  });
  form_product:any;
  isSubmit:boolean = false;
  categories:any;
  dt:any;
  value:any
  constructor(private service:ProductService) {
  
   }

  async ngOnInit(){
    this.categories = await this.service.categories();
    this.form_product = {
      name:"",
      price:"",
      seller: "",
      category: this.categories[0].name,
      img:"",
      real_price: "",
      date_bid: "",
      buy_now_price: "",
      min_price: "",
      sub_img: "",
      description: "",
      auto_add_end_at: 0
    }
  }

  getFileSize(fileSize: number): number {
    let size = fileSize / 1000 / 1000;
    if (size < 1) {
      size = size * 1000;
    }
    return size;
  };
  getFileUnit(fileSize: number): string {
    let size = fileSize / 1000 / 1000;
    let unit = 'MB'
    if (size < 1) {
      unit = "kB"
    }
    return unit;
  };

  calculcate_file_size_name(file: any)
  {
    const check_size = this.getFileSize(file.size);
    const check_fileunit = this.getFileUnit(file.size);
    return check_size + check_fileunit
  }
  validateFiles(event: any){
    
    this.file= event.target.files[0];
    const check_size = this.getFileSize(this.file.size);
    const check_fileunit = this.getFileUnit(this.file.size);
    if(check_size > 1 && check_fileunit === "MB")
    {
      Swal.fire('Your file is too powerful', 'Max file size is 8.00MB please', 'error');
      return;
    }
    else
    {
      this.file_array.push(this.file);
    }

    
  }

  remove(index:any)
  {
    this.file_array.splice(index,1)
  }

  async upload_img()
  {
    this.loading = true;
    let data = new FormData();
    for(let i=0; i<this.file_array.length; i++)
    {
      data.append("file", this.file_array[i]);
      const result = <any> await this.service.upload_file(data);
      if(result)
      {
        const value = result.url;
        console.log(value)
        this.form_product.img = value;
        this.sub_img_array.push(value);
      }
      data.delete("file");

    }
    this.form_product.sub_img = JSON.stringify(this.sub_img_array);
    this.loading = false;
    this.upload_file = true;
    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: 'Upload hình ảnh thành công',
    })
  }

  select(categoryID: any)
  {
    this.form_product.categoryID = categoryID;
  }

  async save() {
    try {
      this.loading = true;
      const local = <any> localStorage.getItem("currentUser");
      const userID = JSON.parse(local)["id"];
      this.form_product.description = this.value
      this.form_product.seller = userID;
      await this.service.create_product(this.form_product);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Upload sản phẩm thành công',
      })
      this.sub_img_array = []
      this.loading = false;
    } catch (error) {
      
    }
  }

  checked(value: any)
  {
    this.form_product.auto_add_end_at = +value.checked;
  }
  date_bid(value: any)
  {
    this.dt = value.value;
    const current_date = new Date();
   
    const mydate = new Date(this.dt);
    if(mydate <= current_date)
    {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ngày hết hạn không hợp lệ',
        })
    }
    else
    {
      const b = this.dt.split('-');
      const date = b[2] + "/" + b[1] + "/" + b[0]
      this.dt = date;
      this.form_product.date_bid = this.dt
    }
  }

  description(value:any) {
    console.log(value);
  }
}
