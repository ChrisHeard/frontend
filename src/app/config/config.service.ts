import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getFinancialData(ticker: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/train/${ticker}`);
  }

  getSymbols(): Observable<any> {
    return this.http.get(`${this.backendUrl}/symbols`);
  }
}