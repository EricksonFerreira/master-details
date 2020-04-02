import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BredCrumbComponent } from './components/bred-crumb/bred-crumb.component';



@NgModule({
  declarations: [BredCrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    // shared modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BredCrumbComponent
  ]
})
export class SharedModule { }
