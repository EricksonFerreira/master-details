import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BredCrumbComponent } from './components/bred-crumb/bred-crumb.component';



@NgModule({
  declarations: [BredCrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    BredCrumbComponent
  ]
})
export class SharedModule { }
