import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomesellerComponent } from './becomeseller.component';
import {BecomeSellerRoutingModule} from './becomseller.routting.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BecomesellerComponent
  ],
  imports: [
    CommonModule,
    BecomeSellerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BecomesellerModule { }
