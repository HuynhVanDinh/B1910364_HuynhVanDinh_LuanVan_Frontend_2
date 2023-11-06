import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BieumauService {
  private baseUrl = 'http://localhost:9004/api/phieudiemcanbo';
  constructor(private http: HttpClient) {}
  getBieuMau(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }
}
