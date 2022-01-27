import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BecomesellerComponent} from './becomeseller.component'

const routes: Routes = [
    {
    path: '',
    data: {
      title: 'Add'
    },
    component: BecomesellerComponent
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeSellerRoutingModule {

}