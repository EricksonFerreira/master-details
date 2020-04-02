import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BredCrumbComponent } from './components/bred-crumb/bred-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';



@NgModule({
  declarations: [
    BredCrumbComponent, PageHeaderComponent
  ],
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

    // shared components
    PageHeaderComponent,
    BredCrumbComponent
  ]
})
export class SharedModule { }
