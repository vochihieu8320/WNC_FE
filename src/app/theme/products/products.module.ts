import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRoutingModule} from './products.routing.module'
import { FileUploadModule } from "ng2-file-upload";   //Should import HERE


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FileUploadModule
  ]
})
export class ProductsModule { }
