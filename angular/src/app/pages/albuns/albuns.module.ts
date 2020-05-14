import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { AlbunsRoutingModule } from './albuns-routing.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumFormComponent } from './album-form/album-form.component';

@NgModule({
  declarations: [AlbumListComponent, AlbumFormComponent],
  imports: [
    SharedModule,
    AlbunsRoutingModule,
  ]
})
export class AlbunsModule { }
