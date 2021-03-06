import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },
  // A video aula ensina do jeito antigo, eu corrigi!!!
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule) },
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'albuns', loadChildren: () => import('./pages/albuns/albuns.module').then(m => m.AlbunsModule) },
  { path: 'testes', loadChildren: () => import('./pages/testes/testes.module').then(m => m.TestesModule) },

  { path: '', redirectTo: 'reports', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
