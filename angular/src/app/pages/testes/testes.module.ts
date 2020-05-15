import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';

import { TestesRoutingModule } from './testes-routing.module';
import { KanbanComponent } from './kanban/kanban.component';


@NgModule({
  declarations: [
    KanbanComponent,
  ],
  imports: [
    SharedModule,
    TestesRoutingModule
  ]
})
export class TestesModule { }
