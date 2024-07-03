import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getRoot(): Observable<any> {
    return this.http.get(`${this.backendUrl}/`);
  }

  getItem(item_id: number, query: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/items/${item_id}?q=${query}`);
  }
}
