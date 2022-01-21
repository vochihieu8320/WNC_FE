import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  Checkout :any;
  isSubmit: Boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.Checkout= {
      name: '',
      phone: '',
      address: '',
    }
   }

  ngOnInit(): void {
  }

  payement(event: any){
    console.log(event.name);
  }
  home(){
    this.router.navigate([`products`]);
  }
  checkout(){
    if(this.Checkout.name === "" || this.Checkout.address === "" || this.Checkout.phone === "")
    {
      return
    }
    alert("Checkout successfully")
  }
}
