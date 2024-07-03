import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MarketsService {

  private backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getIndexList(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/get_index_list`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getIndexData(market: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/get_index?market=${market}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getExchangeData(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/get_exchange_rates`).pipe(
      map(response => {
        return response;
      })
    );
  };

  getIndexComponents(marketSymbols: string[]): Observable<any> {
    const params = marketSymbols.map(symbol => `markets=${encodeURIComponent(symbol)}`).join('&');
    const url = `${this.backendUrl}/get_components?${params}`;
  
    return this.http.get<any>(url).pipe(
      map(response => response)
    );
  }

}

