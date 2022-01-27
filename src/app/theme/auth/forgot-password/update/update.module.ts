import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import {UpdateRoutingModule} from './update.routing.module'
import  {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateModule { }
