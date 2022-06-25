
import { Injectable } from '@angular/core';
import { Conta } from '../model/conta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credor } from '../model/credor';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL = 'http://localhost:3000/';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  saveItem(classe: any, entidade: string): Promise<any> {
    return this.httpClient
      .post<any>(
        this.URL.concat(entidade),
        JSON.stringify(classe),
        this.httpOptions
      )
      .toPromise();
  }

  getItems(entidade: string): Promise<void|any[]> {
    return this.httpClient.get<any[]>(this.URL.concat(entidade)).toPromise();
  }

  getItemsObs(entidade: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.URL.concat(entidade));
  }

  saveItemObs(classe: any, entidade: string): Observable<any> {
    return this.httpClient
      .post<any>(
        this.URL.concat(entidade),
        JSON.stringify(classe),
        this.httpOptions
      );
  }

  removeItemObs(classe: any, entidade: string): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.URL.concat(entidade+'/'+classe.id)
      );
  }

  updateItemObs(classe: any, entidade: string): Observable<any> {
    return this.httpClient
      .put<any>(
        this.URL.concat(entidade + '/' + classe.id),
        JSON.stringify(classe),
        this.httpOptions
      );
  }
}
