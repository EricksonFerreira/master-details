import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanComponent} from './kanban/kanban.component';

const routes: Routes = [
  //  { path: '', component: KanbanComponent },
   { path: 'kanban', component: KanbanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestesRoutingModule { }
