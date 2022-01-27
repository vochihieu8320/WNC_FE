import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetComponent} from './get.component'

const routes: Routes = [
    {
    path: '',
    data: {
      title: 'Add'
    },
    component: GetComponent
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetRoutingModule {

}