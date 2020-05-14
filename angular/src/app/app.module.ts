import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AlbumListComponent } from './pages/albuns/album-list/album-list.component';

@NgModule({
  declarations: [
    AppComponent,
    // AlbumListComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
