import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';


import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  protected http: HttpClient;

  constructor( protected injector: Injector, private categoryService: CategoryService ) {
    super('http://localhost:8000/api/entry', injector, Entry.fromJson);
   }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);
      })
      );
    }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }

    // Gráficos
    getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
      const url = 'http://localhost:8000/api/report/month=' + month + '&year=' + year;
      return this.http.get(url).pipe(
        map(this.jsonDataToResources)
      );
    }



    // Métodos privados
  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(el => {
        const entry =  Object.assign(new Entry(), el);
        entries.push(entry);
    });
    console.log(entries);
    return entries;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}
