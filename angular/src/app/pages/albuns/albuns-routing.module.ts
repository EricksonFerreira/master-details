import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumFormComponent } from './album-form/album-form.component';

const routes: Routes = [
   { path: '', component: AlbumListComponent },
   { path: 'new', component: AlbumFormComponent },
   { path: ':id/edit', component: AlbumFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbunsRoutingModule { }
