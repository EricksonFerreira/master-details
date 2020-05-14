import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import { Album } from '../shared/album.model';
import { Imagem } from '../shared/imagem.model';
import { AlbumService } from '../shared/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent extends BaseResourceListComponent<Album> {

  constructor(private albumService: AlbumService) {
    super(albumService);
   }
}
