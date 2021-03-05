import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './components/form/form.component';
import { InformationComponent } from './components/information/information.component';
import { TextAreaComponent } from './components/inputs/text-area/text-area.component';

@NgModule({
  declarations: [
    FormComponent,
    InformationComponent,
    TextAreaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    FormComponent,
    TextAreaComponent
  ]
})
export class SharedModule { }
