import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckoutComponent} from './checkout.component'

const routes: Routes = [
    {
    path: '',
    data: {
      title: 'Products'
    },
    component: CheckoutComponent
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {

}