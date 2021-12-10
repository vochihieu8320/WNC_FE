import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetComponent } from './get.component';
import {GetRoutingModule} from './get.routing.module'


@NgModule({
  declarations: [
    GetComponent
  ],
  imports: [
    CommonModule,
    GetRoutingModule  
  ]
})
export class GetModule { }
