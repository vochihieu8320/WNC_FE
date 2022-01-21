import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetComponent } from './get.component';
import {GetRoutingModule} from './get.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetComponent
  ],
  imports: [
    CommonModule,
    GetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GetModule { }
