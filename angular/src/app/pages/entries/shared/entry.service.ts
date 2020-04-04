import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor( protected injector: Injector, private categoryService: CategoryService ) {
    super('http://localhost:8000/api/entry', injector, Entry.fromJson);
   }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  // Gráficos
  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    // this.http.get('api/entries?month=mes&year=ano')
    //  . subscribe{};

    return this.getAll().pipe(
      map(entries => {
        console.log();
        return this.filterByMonthAndYear(entries, month, year);
      })
      );
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) {
        return entry;
      }

    });
  }
}
