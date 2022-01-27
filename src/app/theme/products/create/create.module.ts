import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateRoutingModule} from './create-routing.module'
import { FileUploadModule } from "ng2-file-upload";   //Should import HERE
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CreateComponent} from './create.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule
  ]
})
export class CreateModule { }
