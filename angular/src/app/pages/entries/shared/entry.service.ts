import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/categories";
  constructor( private http: HttpClient ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }
  
  getById(id:number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }
  
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)    
      )
    }
  
  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put('sadfsadf', entry).pipe(
        catchError(this.handleError),
        map(() => entry)
        )  
      }
      
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }
  
  
    // Métodos privados
  private jsonDataToCategories(jsonData: any[]): Entry[] {
    const categories: Entry[] = [];
    jsonData.forEach(el => categories.push(el as Entry));
    return categories;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição -> ", error);
    return throwError(error);
  }

}
